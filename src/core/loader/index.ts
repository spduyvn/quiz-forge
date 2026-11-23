import { envelopeSchema } from '../schema/envelope';
import { formatZodError } from '../schema/errors';
import { getActivityModule } from '../registry';
import type { ActivityEntry, ContentEnvelope, LoadIssue, LoadResult, LoadedActivity } from '../types';

export class ContentLoadError extends Error {
  constructor(
    message: string,
    public readonly issues: string[],
  ) {
    super(message);
    this.name = 'ContentLoadError';
  }
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new ContentLoadError('File JSON không hợp lệ.', [detail]);
  }
}

export function loadFromText(text: string): LoadResult {
  const raw = parseJson(text);
  const envelopeResult = envelopeSchema.safeParse(raw);
  if (!envelopeResult.success) {
    throw new ContentLoadError('Cấu trúc file nội dung không hợp lệ.', formatZodError(envelopeResult.error));
  }

  const envelope = envelopeResult.data as ContentEnvelope;
  const activities: LoadedActivity[] = [];
  const issues: LoadIssue[] = [];

  envelope.activities.forEach((entry: ActivityEntry, index) => {
    const module = getActivityModule(entry.kind);
    if (!module) {
      issues.push({
        activityId: entry.id,
        kind: entry.kind,
        severity: 'warning',
        message: `activities[${index}]: loại activity "${entry.kind}" chưa được hỗ trợ, đã bỏ qua.`,
      });
      return;
    }

    let data = entry.data;
    if (module.migrate && typeof entry.config?.fromVersion === 'string') {
      data = module.migrate(data, entry.config.fromVersion);
    }

    const parsed = module.dataSchema.safeParse(data);
    if (!parsed.success) {
      const messages = formatZodError(parsed.error, `activities[${index}].data`);
      issues.push({
        activityId: entry.id,
        kind: entry.kind,
        severity: 'error',
        message: messages.join('\n'),
      });
      return;
    }

    if (entry.config && module.configSchema) {
      const configResult = module.configSchema.safeParse(entry.config);
      if (!configResult.success) {
        issues.push({
          activityId: entry.id,
          kind: entry.kind,
          severity: 'error',
          message: formatZodError(configResult.error, `activities[${index}].config`).join('\n'),
        });
        return;
      }
    }

    activities.push({ entry, module, parsedData: parsed.data });
  });

  return { envelope, activities, issues };
}

export async function loadFromFile(file: File): Promise<LoadResult> {
  const text = await file.text();
  return loadFromText(text);
}

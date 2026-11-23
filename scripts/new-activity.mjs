import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const kind = process.argv[2];
if (!kind || !/^[a-z][a-z0-9-]*$/.test(kind)) {
  console.error('Usage: npm run new:activity -- <kind> (lowercase kebab-case)');
  process.exit(1);
}
const dir = resolve('src/activities', kind);
await mkdir(resolve(dir, '__tests__'), { recursive: true });
const files = {
  'schema.ts': `import { z } from 'zod';\nexport const ${kind.replaceAll('-', '')}DataSchema = z.object({ title: z.string().min(1) });\nexport type ${kind.replaceAll('-', '')}Data = z.infer<typeof ${kind.replaceAll('-', '')}DataSchema>;\n`,
  'Player.tsx': `import type { PlayerProps } from '../../core/types';\nimport type { ${kind.replaceAll('-', '')}Data } from './schema';\nexport default function Player({ data }: PlayerProps<${kind.replaceAll('-', '')}Data, unknown>) { return <section>{data.title}</section>; }\n`,
  'Editor.tsx': `import type { EditorProps } from '../../core/types';\nimport type { ${kind.replaceAll('-', '')}Data } from './schema';\nexport default function Editor({ data, onChange }: EditorProps<${kind.replaceAll('-', '')}Data>) { return <input value={data.title} onChange={(event) => onChange({ ...data, title: event.target.value })} />; }\n`,
  'samples.ts': `export const samples = [{ name: 'Sample', data: { title: 'Sample' } }];\n`,
  'prompt.ts': `export const prompt = { instructions: 'Create valid ${kind} data.', example: { title: 'Sample' } };\n`,
  '__tests__/contract.test.ts': `import { describe, it, expect } from 'vitest';\ndescribe('${kind} contract', () => { it.todo('validate samples, prompt and Player'); });\n`,
};
for (const [name, contents] of Object.entries(files)) await writeFile(resolve(dir, name), contents, 'utf8');
console.log(`Created activity scaffold: ${dir}`);

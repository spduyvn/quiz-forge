import { z } from 'zod';

const safeImageUrl = z
  .string()
  .refine(
    (value) => value.startsWith('https://') || value.startsWith('data:image/'),
    'chỉ chấp nhận URL https hoặc data URI hình ảnh',
  );

export const contentMetaSchema = z.object({
  title: z.string().min(1, 'không được để trống'),
  description: z.string().optional(),
  language: z.enum(['vi', 'en']),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover: safeImageUrl.optional(),
});

export const activityEntrySchema = z.object({
  id: z.string().min(1, 'không được để trống'),
  kind: z.string().min(1, 'không được để trống'),
  config: z.record(z.unknown()).optional(),
  data: z.any(),
});

export const envelopeSchema = z.object({
  schema: z.string().min(1, 'không được để trống'),
  version: z.string().regex(/^\d+\.\d+$/, 'phải có dạng "1.0"'),
  meta: contentMetaSchema,
  activities: z.array(activityEntrySchema).min(1, 'phải có ít nhất một activity'),
}).refine((value) => value.activities.every((entry) => 'data' in entry), {
  message: 'mỗi activity phải có trường data',
  path: ['activities'],
});

export type ValidatedEnvelope = z.infer<typeof envelopeSchema>;

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { ContentEnvelope } from '../types';

export const MAX_SHARE_LENGTH = 7000;

export function encodeShare(envelope: ContentEnvelope): string {
  return compressToEncodedURIComponent(JSON.stringify(envelope));
}

export function decodeShare(encoded: string): ContentEnvelope {
  const json = decompressFromEncodedURIComponent(encoded);
  if (!json) throw new Error('Liên kết chia sẻ không hợp lệ hoặc đã hỏng.');
  return JSON.parse(json) as ContentEnvelope;
}

export function shareIsTooLong(encoded: string): boolean {
  return encoded.length > MAX_SHARE_LENGTH;
}

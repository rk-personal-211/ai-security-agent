import crypto from 'crypto';

const ENCRYPTION_KEY = Buffer.from(env.SESSION_ENCRYPTION_KEY, 'hex'); // 32 bytes for AES-256
const IV_LENGTH = 16;

function encryptSessionId(sessionId: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(sessionId, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString('base64url');
}

function decryptSessionId(encryptedValue: string): string {
  const data = Buffer.from(encryptedValue, 'base64url');
  const iv = data.subarray(0, IV_LENGTH);
  const authTag = data.subarray(IV_LENGTH, IV_LENGTH + 16);
  const encrypted = data.subarray(IV_LENGTH + 16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

function setSessionCookie(response: Response, sessionId: string): void {
  const encryptedSessionId = encryptSessionId(sessionId);
  response.cookie(sessionCookieName, encryptedSessionId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
  });
}
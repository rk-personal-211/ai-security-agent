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

function setSessionCookie(response: Response, sessionId: string): void {
  const encryptedSessionId = encryptSessionId(sessionId);
  response.cookie(sessionCookieName, encryptedSessionId, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    signed: true,
    maxAge: 1000 * 60 * 60 * 2,
    path: '/'
  });
}
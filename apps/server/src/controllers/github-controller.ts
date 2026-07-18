import { Request, Response } from 'express';
import crypto from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(crypto.scrypt);

// Encryption configuration - keys should be stored in environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes (256 bits) for AES-256
const ALGORITHM = 'aes-256-gcm';

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
  throw new Error('ENCRYPTION_KEY environment variable must be set and at least 32 characters long');
}

/**
 * Encrypts sensitive data before storage
 */
async function encryptSensitiveData(plaintext: string): Promise<string> {
  const iv = crypto.randomBytes(16);
  const key = await scrypt(ENCRYPTION_KEY as string, 'salt', 32) as Buffer;
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // Store iv:authTag:encryptedData
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts sensitive data retrieved from storage
 */
async function decryptSensitiveData(encryptedData: string): Promise<string> {
  const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
  
  if (!ivHex || !authTagHex || !encrypted) {
    throw new Error('Invalid encrypted data format');
  }
  
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const key = await scrypt(ENCRYPTION_KEY as string, 'salt', 32) as Buffer;
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

/**
 * Masks a token for logging purposes - never log full tokens
 */
function maskSensitiveValue(value: string): string {
  if (!value || value.length < 8) {
    return '***';
  }
  return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
}

export const saveGitHubToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, userId } = req.body;
    
    if (!token || typeof token !== 'string') {
      res.status(400).json({ error: 'Invalid token provided' });
      return;
    }
    
    // Validate token format before storing
    if (!/^gh[pousr]_[A-Za-z0-9_]+$/.test(token) && !/^github_pat_[A-Za-z0-9_]+$/.test(token)) {
      res.status(400).json({ error: 'Invalid GitHub token format' });
      return;
    }
    
    // Encrypt the token before storage - never store in plaintext
    const encryptedToken = await encryptSensitiveData(token);
    
    // Store the encrypted token (replace with your actual DB call)
    // await db.users.update({ id: userId }, { githubToken: encryptedToken });
    
    // Log only masked version - never log sensitive values
    console.info(`GitHub token updated for user ${userId}: ${maskSensitiveValue(token)}`);
    
    res.status(200).json({ message: 'GitHub token saved securely' });
  } catch (error) {
    // Do not expose internal error details
    console.error('Error saving GitHub token:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Failed to save GitHub token' });
  }
};

export const getGitHubToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    // Retrieve encrypted token from DB (replace with your actual DB call)
    // const user = await db.users.findOne({ id: userId });
    // const encryptedToken = user?.githubToken;
    const encryptedToken = ''; // placeholder
    
    if (!encryptedToken) {
      res.status(404).json({ error: 'No GitHub token found' });
      return;
    }
    
    // Decrypt only when needed for use, not for transmission
    const decryptedToken = await decryptSensitiveData(encryptedToken);
    
    // Use the token server-side only - do not return raw tokens to clients
    // If client needs confirmation, return only masked version
    res.status(200).json({ 
      tokenConfigured: true,
      maskedToken: maskSensitiveValue(decryptedToken)
    });
  } catch (error) {
    console.error('Error retrieving GitHub token:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Failed to retrieve GitHub token' });
  }
};

export const deleteGitHubToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    // Delete the token from storage (replace with your actual DB call)
    // await db.users.update({ id: userId }, { githubToken: null });
    
    console.info(`GitHub token removed for user ${userId}`);
    res.status(200).json({ message: 'GitHub token removed successfully' });
  } catch (error) {
    console.error('Error deleting GitHub token:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: 'Failed to delete GitHub token' });
  }
};
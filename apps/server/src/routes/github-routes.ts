import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { githubService } from '../services/github-service';
import { logger } from '../utils/logger';

const router = Router();

// Rate limiter for general GitHub API routes
const githubRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    error: 'Too many requests, please try again later.'
  },
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip} on path: ${req.path}`);
    res.status(429).json({
      status: 429,
      error: 'Too many requests, please try again later.'
    });
  }
});

// Stricter rate limiter for authentication/webhook endpoints
const strictRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.'
  },
  handler: (req: Request, res: Response) => {
    logger.warn(`Strict rate limit exceeded for IP: ${req.ip} on path: ${req.path}`);
    res.status(429).json({
      status: 429,
      error: 'Too many requests, please try again later.'
    });
  }
});

// Apply general rate limiting to all GitHub routes
router.use(githubRateLimiter);

// GitHub OAuth callback - stricter rate limiting
router.get('/callback', strictRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, state } = req.query;
    if (!code || !state) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    const result = await githubService.handleOAuthCallback(code as string, state as string);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

// GitHub webhook endpoint - stricter rate limiting
router.post('/webhook', strictRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
      return res.status(401).json({ error: 'Missing webhook signature' });
    }
    const result = await githubService.handleWebhook(req.body, signature as string);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

// General GitHub API routes
router.get('/repos', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repos = await githubService.getRepositories();
    return res.json(repos);
  } catch (error) {
    next(error);
  }
});

router.get('/repos/:owner/:repo', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { owner, repo } = req.params;
    const repoData = await githubService.getRepository(owner, repo);
    return res.json(repoData);
  } catch (error) {
    next(error);
  }
});

export default router;
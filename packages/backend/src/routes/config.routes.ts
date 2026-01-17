import { Router, Request, Response } from 'express';
import { type Config } from '../config/index.js';

/**
 * Creates a router for configuration-related endpoints
 *
 * @param config - Application configuration object
 * @returns Express router with configuration routes
 */
export function createConfigRouter(config: Config): Router {
  const router = Router();

  /**
   * GET /api/config/status
   *
   * Returns the configuration status without exposing sensitive values.
   * This endpoint is used by the frontend to display configuration warnings.
   *
   * @returns {Object} Configuration status
   * @returns {boolean} configured - Whether all required variables are present
   * @returns {string[]} missing - Array of missing required variable names
   *
   * @example
   * Response when configured:
   * {
   *   "configured": true,
   *   "missing": []
   * }
   *
   * @example
   * Response when incomplete:
   * {
   *   "configured": false,
   *   "missing": ["OPENAI_API_KEY"]
   * }
   */
  router.get('/status', (_req: Request, res: Response) => {
    // NFR10: Never expose actual API key values
    res.json({
      configured: config.isConfigComplete,
      missing: config.missingVars,
    });
  });

  return router;
}

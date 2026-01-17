import 'dotenv/config'

/**
 * Application configuration interface
 *
 * @property openaiApiKey - OpenAI API key (optional for graceful degradation)
 * @property port - Server port number
 * @property frontendUrl - Frontend URL for CORS configuration
 * @property nodeEnv - Node environment (development, production, test)
 * @property isConfigComplete - Flag indicating if all required variables are present
 * @property missingVars - Array of missing required variable names
 */
export interface Config {
  openaiApiKey?: string
  port: number
  frontendUrl: string
  nodeEnv: string
  isConfigComplete: boolean
  missingVars: string[]
}

/**
 * Loads and validates environment configuration
 *
 * This function reads environment variables from .env file and validates
 * that all required variables are present. If required variables are missing,
 * it logs a warning but allows the server to start (graceful degradation).
 *
 * @returns {Config} Configuration object with all environment variables
 *
 * @example
 * ```typescript
 * const config = loadConfig()
 * if (!config.isConfigComplete) {
 *   console.warn('Configuration incomplete:', config.missingVars)
 * }
 * ```
 */
export function loadConfig(): Config {
  const missingVars: string[] = []

  // Check required variables (NFR9)
  if (!process.env.OPENAI_API_KEY) {
    missingVars.push('OPENAI_API_KEY')
  }

  // Validate and parse PORT (NFR14: explicit error messages)
  const portValue = parseInt(process.env.PORT || '3000', 10)
  if (isNaN(portValue)) {
    throw new Error(
      `Invalid PORT environment variable: "${process.env.PORT}". PORT must be a valid number. Example: PORT=3000`
    )
  }
  if (portValue < 1 || portValue > 65535) {
    throw new Error(
      `Invalid PORT environment variable: ${portValue}. PORT must be between 1 and 65535.`
    )
  }

  const config: Config = {
    openaiApiKey: process.env.OPENAI_API_KEY,
    port: portValue,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    nodeEnv: process.env.NODE_ENV || 'development',
    isConfigComplete: missingVars.length === 0,
    missingVars,
  }

  // Log configuration summary (NFR10: mask API keys)
  logConfigSummary(config)

  return config
}

/**
 * Logs a summary of the current configuration
 *
 * This function logs the configuration status to the console, masking
 * sensitive values like API keys (NFR10).
 *
 * @param config - Configuration object to log
 */
function logConfigSummary(config: Config): void {
  console.log('=== Configuration Status ===')
  console.log(`  PORT: ${config.port}`)
  console.log(`  FRONTEND_URL: ${config.frontendUrl}`)
  console.log(`  NODE_ENV: ${config.nodeEnv}`)
  console.log(`  OPENAI_API_KEY: ${config.openaiApiKey ? '***configured***' : '❌ NOT SET'}`)

  if (!config.isConfigComplete) {
    console.warn('\n⚠️  WARNING: Configuration incomplete')
    console.warn(`Missing required variables: ${config.missingVars.join(', ')}`)
    console.warn('Some features will be disabled until configuration is complete.')
    console.warn('See .env.example for required variables.\n')
  }

  console.log('============================\n')
}

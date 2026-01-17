/**
 * Custom error class for configuration-related errors
 *
 * @example
 * ```typescript
 * throw new ConfigError(
 *   'OPENAI_API_KEY',
 *   'Missing required environment variable: OPENAI_API_KEY',
 *   'Copy .env.example to .env and add your OpenAI API key'
 * )
 * ```
 */
export class ConfigError extends Error {
  public variable: string
  public suggestion?: string

  constructor(
    variable: string,
    message: string,
    suggestion?: string
  ) {
    super(message)
    this.name = 'ConfigError'
    this.variable = variable
    this.suggestion = suggestion
  }
}

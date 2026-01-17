import { describe, it, expect } from 'vitest'
import { ConfigError } from './errors.js'

describe('ConfigError', () => {
  it('should create a ConfigError with all properties', () => {
    const error = new ConfigError(
      'OPENAI_API_KEY',
      'Missing required environment variable: OPENAI_API_KEY',
      'Copy .env.example to .env and add your OpenAI API key'
    )

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ConfigError)
    expect(error.name).toBe('ConfigError')
    expect(error.variable).toBe('OPENAI_API_KEY')
    expect(error.message).toBe('Missing required environment variable: OPENAI_API_KEY')
    expect(error.suggestion).toBe('Copy .env.example to .env and add your OpenAI API key')
  })

  it('should create a ConfigError without suggestion', () => {
    const error = new ConfigError(
      'PORT',
      'Invalid port number'
    )

    expect(error.variable).toBe('PORT')
    expect(error.message).toBe('Invalid port number')
    expect(error.suggestion).toBeUndefined()
  })

  it('should have a stack trace', () => {
    const error = new ConfigError('TEST_VAR', 'Test error')

    expect(error.stack).toBeDefined()
    expect(error.stack).toContain('ConfigError')
  })
})

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { loadConfig } from './env.js'

describe('loadConfig', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Create a fresh copy of process.env for each test
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv
  })

  it('should load configuration with all required variables', () => {
    process.env.OPENAI_API_KEY = 'test-key'
    process.env.PORT = '3000'
    process.env.FRONTEND_URL = 'http://localhost:5173'
    process.env.NODE_ENV = 'test'

    const config = loadConfig()

    expect(config.openaiApiKey).toBe('test-key')
    expect(config.port).toBe(3000)
    expect(config.frontendUrl).toBe('http://localhost:5173')
    expect(config.nodeEnv).toBe('test')
    expect(config.isConfigComplete).toBe(true)
    expect(config.missingVars).toEqual([])
  })

  it('should use defaults for optional variables', () => {
    process.env.OPENAI_API_KEY = 'test-key'
    delete process.env.PORT
    delete process.env.FRONTEND_URL
    delete process.env.NODE_ENV

    const config = loadConfig()

    expect(config.port).toBe(3000)
    expect(config.frontendUrl).toBe('http://localhost:5173')
    expect(config.nodeEnv).toBe('development')
  })

  it('should mark config as incomplete when OPENAI_API_KEY is missing', () => {
    delete process.env.OPENAI_API_KEY

    const config = loadConfig()

    expect(config.isConfigComplete).toBe(false)
    expect(config.missingVars).toEqual(['OPENAI_API_KEY'])
    expect(config.openaiApiKey).toBeUndefined()
  })

  it('should parse PORT as integer', () => {
    process.env.OPENAI_API_KEY = 'test-key'
    process.env.PORT = '8080'

    const config = loadConfig()

    expect(config.port).toBe(8080)
    expect(typeof config.port).toBe('number')
  })

  it('should not expose API key in missing vars array', () => {
    delete process.env.OPENAI_API_KEY

    const config = loadConfig()

    // Verify that missing vars only contains variable names, not values
    expect(config.missingVars).toEqual(['OPENAI_API_KEY'])
    expect(config.missingVars[0]).not.toContain('sk-')
  })

  it('should throw error for invalid PORT (non-numeric)', () => {
    process.env.OPENAI_API_KEY = 'test-key'
    process.env.PORT = 'invalid'

    expect(() => loadConfig()).toThrow('Invalid PORT environment variable: "invalid"')
    expect(() => loadConfig()).toThrow('PORT must be a valid number')
  })

  it('should throw error for PORT below valid range', () => {
    process.env.OPENAI_API_KEY = 'test-key'
    process.env.PORT = '0'

    expect(() => loadConfig()).toThrow('Invalid PORT environment variable: 0')
    expect(() => loadConfig()).toThrow('PORT must be between 1 and 65535')
  })

  it('should throw error for PORT above valid range', () => {
    process.env.OPENAI_API_KEY = 'test-key'
    process.env.PORT = '99999'

    expect(() => loadConfig()).toThrow('Invalid PORT environment variable: 99999')
    expect(() => loadConfig()).toThrow('PORT must be between 1 and 65535')
  })

  it('should accept PORT at boundary values', () => {
    process.env.OPENAI_API_KEY = 'test-key'

    // Test minimum valid port
    process.env.PORT = '1'
    let config = loadConfig()
    expect(config.port).toBe(1)

    // Test maximum valid port
    process.env.PORT = '65535'
    config = loadConfig()
    expect(config.port).toBe(65535)
  })
})

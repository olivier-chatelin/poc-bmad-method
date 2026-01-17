import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigErrorBanner } from './ConfigErrorBanner'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('ConfigErrorBanner', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear()
    // Reset fetch mock
    mockFetch.mockReset()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when configuration is complete', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ configured: true, missing: [] }),
    })

    render(<ConfigErrorBanner />)

    await waitFor(() => {
      expect(screen.queryByText(/Configuration Incomplete/i)).not.toBeInTheDocument()
    })
  })

  it('should render when configuration is incomplete', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ configured: false, missing: ['OPENAI_API_KEY'] }),
    })

    render(<ConfigErrorBanner />)

    await waitFor(() => {
      expect(screen.getByText(/Configuration Incomplete/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/OPENAI_API_KEY/)).toBeInTheDocument()
    expect(screen.getByText(/add your API keys/i)).toBeInTheDocument()
  })

  it('should display multiple missing variables', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        configured: false,
        missing: ['OPENAI_API_KEY', 'MCP_SERVER_URL']
      }),
    })

    render(<ConfigErrorBanner />)

    await waitFor(() => {
      expect(screen.getByText(/OPENAI_API_KEY, MCP_SERVER_URL/)).toBeInTheDocument()
    })
  })

  it('should dismiss banner when X button is clicked', async () => {
    const user = userEvent.setup()

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ configured: false, missing: ['OPENAI_API_KEY'] }),
    })

    render(<ConfigErrorBanner />)

    await waitFor(() => {
      expect(screen.getByText(/Configuration Incomplete/i)).toBeInTheDocument()
    })

    const dismissButton = screen.getByTitle(/Dismiss this warning/i)
    await user.click(dismissButton)

    await waitFor(() => {
      expect(screen.queryByText(/Configuration Incomplete/i)).not.toBeInTheDocument()
    })

    // Verify sessionStorage was set
    expect(sessionStorage.getItem('config-banner-dismissed')).toBe('true')
  })

  it('should not render if previously dismissed', async () => {
    sessionStorage.setItem('config-banner-dismissed', 'true')

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ configured: false, missing: ['OPENAI_API_KEY'] }),
    })

    render(<ConfigErrorBanner />)

    // Should not make fetch call
    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled()
    })

    expect(screen.queryByText(/Configuration Incomplete/i)).not.toBeInTheDocument()
  })

  it('should fetch from correct endpoint', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ configured: true, missing: [] }),
    })

    render(<ConfigErrorBanner />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/config/status')
    })
  })

  it('should handle fetch errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<ConfigErrorBanner />)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch config status:',
        expect.any(Error)
      )
    })

    // Banner should not render on error
    expect(screen.queryByText(/Configuration Incomplete/i)).not.toBeInTheDocument()

    consoleErrorSpy.mockRestore()
  })
})

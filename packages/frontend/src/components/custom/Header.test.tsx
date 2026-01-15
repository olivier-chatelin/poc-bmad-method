import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header Component', () => {
  it('renders with default props (AC#1)', () => {
    render(<Header />)

    // Verify app title
    expect(screen.getByText('Chatbot MCP Lab')).toBeInTheDocument()

    // Verify MVP badge
    expect(screen.getByText('MVP')).toBeInTheDocument()
  })

  it('displays MCP status indicator - disconnected by default (AC#1)', () => {
    render(<Header />)

    // Verify MCP status shows disconnected
    expect(screen.getByText(/MCP: Disconnected/)).toBeInTheDocument()
  })

  it('displays MCP status indicator - connecting state', () => {
    render(<Header mcpStatus="connecting" />)

    expect(screen.getByText(/MCP: Connecting.../)).toBeInTheDocument()
  })

  it('displays MCP status indicator - connected state', () => {
    render(<Header mcpStatus="connected" />)

    expect(screen.getByText(/MCP: Connected/)).toBeInTheDocument()
  })

  it('displays LLM status indicator - GPT-4o ready (AC#1)', () => {
    render(<Header />)

    expect(screen.getByText(/LLM: GPT-4o/)).toBeInTheDocument()
  })

  it('displays LLM status indicator - error state', () => {
    render(<Header llmStatus="error" />)

    // Still shows GPT-4o but with error color
    expect(screen.getByText(/LLM: GPT-4o/)).toBeInTheDocument()
  })

  it('renders Settings button disabled with tooltip', () => {
    render(<Header />)

    const settingsButton = screen.getByRole('button', { name: /settings/i })
    expect(settingsButton).toBeInTheDocument()
    expect(settingsButton).toBeDisabled()
    expect(settingsButton).toHaveAttribute('title', 'Settings coming soon')
  })

  it('has fixed height of 64px (h-16 = 4rem = 64px)', () => {
    const { container } = render(<Header />)

    const header = container.querySelector('header')
    expect(header).toHaveClass('h-16')
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Layout', () => {
  it('renders header with status indicators (AC#1)', () => {
    render(<App />)

    // Verify header is present
    expect(screen.getByText('Chatbot MCP Lab')).toBeInTheDocument()

    // Verify MCP status indicator
    expect(screen.getByText(/MCP:/)).toBeInTheDocument()

    // Verify LLM status indicator
    expect(screen.getByText(/LLM: GPT-4o/)).toBeInTheDocument()
  })

  it('renders 50/50 layout with Chat and Observability panels (AC#2)', () => {
    render(<App />)

    // Verify Chat panel is present (left)
    expect(screen.getByText('Chat')).toBeInTheDocument()

    // Verify Observability panel is present (right)
    expect(screen.getByText('Pipeline Logs')).toBeInTheDocument()
  })

  it('uses CSS Grid layout (AC#3)', () => {
    const { container } = render(<App />)

    // Find the main element
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()

    // Verify grid classes are applied
    expect(main).toHaveClass('grid')
    expect(main).toHaveClass('grid-cols-2')
  })

  it('applies dark mode and fills viewport height (AC#3, AC#4)', () => {
    const { container } = render(<App />)

    // Verify root div has full height
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('h-screen')

    // Verify background and text classes for dark mode
    expect(root).toHaveClass('bg-background')
    expect(root).toHaveClass('text-foreground')
  })
})

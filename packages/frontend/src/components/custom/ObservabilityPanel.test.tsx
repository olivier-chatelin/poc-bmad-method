import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ObservabilityPanel } from './ObservabilityPanel'

describe('ObservabilityPanel Component', () => {
  it('renders Pipeline Logs header (AC#2)', () => {
    render(<ObservabilityPanel />)

    expect(screen.getByText('Pipeline Logs')).toBeInTheDocument()
  })

  it('displays empty state message', () => {
    render(<ObservabilityPanel />)

    expect(screen.getByText('No logs yet')).toBeInTheDocument()
    expect(screen.getByText(/Pipeline activity will appear here/)).toBeInTheDocument()
  })

  it('renders all filter buttons (All, Info, Error, Debug)', () => {
    render(<ObservabilityPanel />)

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Info' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Error' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Debug' })).toBeInTheDocument()
  })

  it('filter buttons are disabled (placeholder for Story 3.3)', () => {
    render(<ObservabilityPanel />)

    const allButton = screen.getByRole('button', { name: 'All' })
    const infoButton = screen.getByRole('button', { name: 'Info' })
    const errorButton = screen.getByRole('button', { name: 'Error' })
    const debugButton = screen.getByRole('button', { name: 'Debug' })

    expect(allButton).toBeDisabled()
    expect(infoButton).toBeDisabled()
    expect(errorButton).toBeDisabled()
    expect(debugButton).toBeDisabled()
  })

  it('logs area uses monospace font (AC#5)', () => {
    const { container } = render(<ObservabilityPanel />)

    // Find CardContent which contains logs area
    const logsArea = container.querySelector('.font-mono')
    expect(logsArea).toBeInTheDocument()
    expect(logsArea).toHaveClass('font-mono')
  })

  it('displays placeholder text for future functionality', () => {
    render(<ObservabilityPanel />)

    expect(screen.getByText(/Real-time logs will be enabled in Story 3.3/)).toBeInTheDocument()
  })
})

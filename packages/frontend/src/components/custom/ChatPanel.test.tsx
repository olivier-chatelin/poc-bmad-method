import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChatPanel } from './ChatPanel'

describe('ChatPanel Component', () => {
  it('renders Chat header (AC#2)', () => {
    render(<ChatPanel />)

    expect(screen.getByText('Chat')).toBeInTheDocument()
  })

  it('displays empty state message', () => {
    render(<ChatPanel />)

    expect(screen.getByText('No messages yet')).toBeInTheDocument()
    expect(screen.getByText(/Start a conversation by typing below/)).toBeInTheDocument()
  })

  it('renders input placeholder area at bottom', () => {
    render(<ChatPanel />)

    const input = screen.getByPlaceholderText('Type your message...')
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  it('renders send button disabled', () => {
    render(<ChatPanel />)

    const sendButton = screen.getByRole('button')
    expect(sendButton).toBeDisabled()
  })

  it('displays placeholder text for future functionality', () => {
    render(<ChatPanel />)

    expect(screen.getByText(/Chat will be enabled in Story 5.1/)).toBeInTheDocument()
  })
})

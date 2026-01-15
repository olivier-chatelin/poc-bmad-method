import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'

interface HeaderProps {
  mcpStatus?: 'disconnected' | 'connecting' | 'connected'
  llmStatus?: 'ready' | 'error'
}

export function Header({ mcpStatus = 'disconnected', llmStatus = 'ready' }: HeaderProps) {
  const mcpStatusColor = {
    disconnected: 'bg-warning',
    connecting: 'bg-info',
    connected: 'bg-success',
  }[mcpStatus]

  const mcpStatusText = {
    disconnected: 'Disconnected',
    connecting: 'Connecting...',
    connected: 'Connected',
  }[mcpStatus]

  const llmStatusColor = llmStatus === 'ready' ? 'bg-success' : 'bg-error'

  return (
    <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between">
      {/* Left: App Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Chatbot MCP Lab</h1>
        <Badge variant="info">MVP</Badge>
      </div>

      {/* Right: Status Indicators */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="gap-1">
          <span className={`h-2 w-2 rounded-full ${mcpStatusColor}`} />
          MCP: {mcpStatusText}
        </Badge>
        <Badge variant="outline" className="gap-1">
          <span className={`h-2 w-2 rounded-full ${llmStatusColor}`} />
          LLM: GPT-4o
        </Badge>
        <Button variant="ghost" size="icon" disabled title="Settings coming soon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

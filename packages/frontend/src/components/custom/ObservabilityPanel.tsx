import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity } from 'lucide-react'

type LogFilter = 'all' | 'info' | 'error' | 'debug'

export function ObservabilityPanel() {
  // TODO: Connect to filter state in Story 3.3
  const activeFilter: LogFilter = 'all'

  const filters: { key: LogFilter; label: string; color: string }[] = [
    { key: 'all', label: 'All', color: '' },
    { key: 'info', label: 'Info', color: 'text-info' },
    { key: 'error', label: 'Error', color: 'text-error' },
    { key: 'debug', label: 'Debug', color: 'text-muted-foreground' },
  ]

  return (
    <div className="p-4 flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4" />
              Pipeline Logs
            </CardTitle>

            {/* Filter Buttons */}
            <div className="flex gap-1">
              {filters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? 'secondary' : 'ghost'}
                  size="sm"
                  className={`text-xs h-7 px-2 ${filter.color}`}
                  disabled
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        {/* Logs Area - Scrollable with Monospace Font */}
        <CardContent className="flex-1 flex flex-col overflow-y-auto font-mono text-sm">
          {/* Empty State */}
          <div className="flex-1 flex flex-col justify-center items-center text-muted-foreground">
            <Activity className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-sans">No logs yet</p>
            <p className="text-xs mt-1 font-sans">
              Pipeline activity will appear here
            </p>
          </div>
        </CardContent>

        {/* Footer Info */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Real-time logs will be enabled in Story 3.3
          </p>
        </div>
      </Card>
    </div>
  )
}

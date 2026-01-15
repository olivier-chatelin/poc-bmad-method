import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, MessageSquare, Activity } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="h-16 border-b border-border px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Chatbot MCP Lab</h1>
          <Badge variant="info">MVP</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <span className="h-2 w-2 rounded-full bg-warning" />
            MCP: Disconnected
          </Badge>
          <Badge variant="outline" className="gap-1">
            <span className="h-2 w-2 rounded-full bg-success" />
            LLM: GPT-4o
          </Badge>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content - 50/50 Layout */}
      <main className="h-[calc(100vh-64px)] grid grid-cols-2">
        {/* Chat Panel (Left) */}
        <div className="border-r border-border p-4 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" />
                Chat Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center text-muted-foreground">
              <p>Chat component will be added in Story 5.1</p>
            </CardContent>
          </Card>
        </div>

        {/* Observability Panel (Right) */}
        <div className="p-4 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4" />
                Observability Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center text-muted-foreground">
              <p>Observability component will be added in Story 3.3</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App

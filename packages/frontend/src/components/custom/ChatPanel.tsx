import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageSquare, Send } from 'lucide-react'

export function ChatPanel() {
  return (
    <div className="border-r border-border p-4 flex flex-col h-full">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4" />
            Chat
          </CardTitle>
        </CardHeader>

        {/* Messages Area - Scrollable */}
        <CardContent className="flex-1 flex flex-col overflow-y-auto">
          {/* Empty State */}
          <div className="flex-1 flex flex-col justify-center items-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm">No messages yet</p>
            <p className="text-xs mt-1">Start a conversation by typing below</p>
          </div>
        </CardContent>

        {/* Input Area - Fixed at Bottom */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              disabled
              className="flex-1"
            />
            <Button disabled size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Chat will be enabled in Story 5.1
          </p>
        </div>
      </Card>
    </div>
  )
}

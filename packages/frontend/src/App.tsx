import { Header } from '@/components/custom/Header'
import { ChatPanel } from '@/components/custom/ChatPanel'
import { ObservabilityPanel } from '@/components/custom/ObservabilityPanel'
import { ConfigErrorBanner } from '@/components/custom/ConfigErrorBanner'

function App() {
  return (
    <div className="h-screen bg-background text-foreground">
      {/* Header - Fixed 64px */}
      <Header />

      {/* Main Content - 50/50 Layout with CSS Grid */}
      <main className="grid grid-cols-2 h-[calc(100vh-64px)]">
        {/* Chat Panel (Left - 50%) */}
        <div className="flex flex-col">
          {/* Configuration Error Banner (Story 1.5 - AC#4) */}
          <div className="p-4">
            <ConfigErrorBanner />
          </div>
          <ChatPanel />
        </div>

        {/* Observability Panel (Right - 50%) */}
        <ObservabilityPanel />
      </main>
    </div>
  )
}

export default App

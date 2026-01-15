import { Header } from '@/components/custom/Header'
import { ChatPanel } from '@/components/custom/ChatPanel'
import { ObservabilityPanel } from '@/components/custom/ObservabilityPanel'

function App() {
  return (
    <div className="h-screen bg-background text-foreground">
      {/* Header - Fixed 64px */}
      <Header />

      {/* Main Content - 50/50 Layout with CSS Grid */}
      <main className="grid grid-cols-2 h-[calc(100vh-64px)]">
        {/* Chat Panel (Left - 50%) */}
        <ChatPanel />

        {/* Observability Panel (Right - 50%) */}
        <ObservabilityPanel />
      </main>
    </div>
  )
}

export default App

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

/**
 * Configuration status response from backend
 */
interface ConfigStatus {
  configured: boolean
  missing: string[]
}

/**
 * ConfigErrorBanner Component
 *
 * Displays a warning banner when backend configuration is incomplete.
 * Fetches configuration status from /api/config/status endpoint on mount.
 * Includes retry logic with exponential backoff for backend connectivity.
 * User can dismiss the banner (stored in sessionStorage with 24h expiration).
 *
 * @example
 * ```tsx
 * <ConfigErrorBanner />
 * ```
 *
 * Story 1.5 - AC#4: Frontend configuration error UI
 */
export function ConfigErrorBanner() {
  const [status, setStatus] = useState<ConfigStatus | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [fetchError, setFetchError] = useState<boolean>(false)

  useEffect(() => {
    // Check sessionStorage for dismissal with 24h expiration
    const dismissData = sessionStorage.getItem('config-banner-dismissed')
    if (dismissData) {
      try {
        const { timestamp } = JSON.parse(dismissData)
        const hoursSinceDismiss = (Date.now() - timestamp) / (1000 * 60 * 60)
        if (hoursSinceDismiss < 24) {
          setDismissed(true)
          return
        } else {
          // Expired, remove from storage
          sessionStorage.removeItem('config-banner-dismissed')
        }
      } catch {
        // Invalid JSON, remove and continue
        sessionStorage.removeItem('config-banner-dismissed')
      }
    }

    // Get backend URL from environment variable (defaults to localhost:3000)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

    // Fetch configuration status with retry logic
    const fetchWithRetry = async (retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(`${backendUrl}/api/config/status`)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data = await res.json()
          setStatus(data)
          setFetchError(false)
          return
        } catch (err) {
          console.error(`Failed to fetch config status (attempt ${i + 1}/${retries}):`, err)
          if (i < retries - 1) {
            // Wait with exponential backoff before retry
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
          } else {
            // All retries failed
            setFetchError(true)
          }
        }
      }
    }

    fetchWithRetry()
  }, [])

  const handleDismiss = () => {
    // Store dismissal with timestamp for 24h expiration
    sessionStorage.setItem('config-banner-dismissed', JSON.stringify({ timestamp: Date.now() }))
    setDismissed(true)
  }

  // Don't render if dismissed
  if (dismissed) {
    return null
  }

  // Show fetch error banner if backend unreachable
  if (fetchError) {
    return (
      <Alert variant="destructive" className="mb-4 relative">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Cannot Connect to Backend</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Unable to reach the backend server after multiple attempts.
          </p>
          <p className="text-sm">
            Ensure the backend is running on <code>{import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}</code>.
            Check the terminal for errors and verify your <code>.env</code> configuration.
          </p>
        </AlertDescription>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
          onClick={handleDismiss}
          title="Dismiss this warning"
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    )
  }

  // Don't render if no status yet or configuration is complete
  if (!status || status.configured) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4 relative">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Configuration Incomplete</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Missing required environment variables: <strong>{status.missing.join(', ')}</strong>
        </p>
        <p className="text-sm">
          Copy <code>.env.example</code> to <code>.env</code> and add your API keys.
          See README for setup instructions.
        </p>
      </AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2"
        onClick={handleDismiss}
        title="Dismiss this warning"
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}

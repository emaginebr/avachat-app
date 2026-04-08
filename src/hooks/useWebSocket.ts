import { useCallback, useEffect, useRef, useState } from 'react'

interface WebSocketMessage {
  type: string
  [key: string]: unknown
}

interface UseWebSocketReturn {
  connected: boolean
  send: (data: WebSocketMessage) => void
  error: string | null
}

const useWebSocket = (
  url: string | null,
  onMessage: (msg: WebSocketMessage) => void,
): UseWebSocketReturn => {
  const wsRef = useRef<WebSocket | null>(null)
  const onMessageRef = useRef(onMessage)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Keep callback ref up to date without re-creating the WebSocket
  onMessageRef.current = onMessage

  useEffect(() => {
    if (!url) return

    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => setConnected(true)
    ws.onclose = () => setConnected(false)
    ws.onerror = () => setError('Erro na conexao WebSocket')
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage
        onMessageRef.current(data)
      } catch {
        setError('Mensagem invalida recebida')
      }
    }

    return () => {
      ws.close()
    }
  }, [url])

  const send = useCallback((data: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
  }, [])

  return { connected, send, error }
}

export default useWebSocket

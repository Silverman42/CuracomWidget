export interface IIdentifierResponse {
  websocket_config: WebsocketConfig
}

export interface WebsocketConfig {
  broadcaster: 'reverb'
  key: string
  wsHost: string
  wsPort: number
  wssPort: number
  forceTLS: boolean
  enabledTransports: string[]
}

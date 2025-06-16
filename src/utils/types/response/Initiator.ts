export interface IIdentifierResponse {
  websocket_config: WebsocketConfig
  customer: null | ICustomer
  countries: ICountryPhoneCode[]
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

export interface ICustomer {
  uid: string
  history: IChatHistory[]
}

export interface ICountryPhoneCode {
  name: string
  dial_code: string
  iso_code: string
  phone_number_length: number
  flag: string
}

export interface IChatHistory {
  body: string
  media: null
  type: MessageType
  sender: SenderType
  time: string
  avatar: string
}

enum SenderType {
  CUSTOMER = 'customer',
  AGENT = 'agent',
}

enum MessageType {
  TEXT = 'text',
  VOICE = 'voice',
  IMAGE = 'image',
  IMAGE_TEXT = 'image-text',
  ATTACHMENT = 'attachment',
}

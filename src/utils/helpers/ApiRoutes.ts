const version = '/v1'
export const ApiRoutes = {
  VISITOR_IDENTIFY: version + '/visitor/identify',
  LOG_PAGE_VISIT: `${version}/visitor/log`,
  CHAT_SEND_MESSAGE: `${version}/chat/send`,
  CHAT_TRIGGER_AGENT_MESSAGE: (chatUid: string) => `${version}/chats/${chatUid}/send`,
}

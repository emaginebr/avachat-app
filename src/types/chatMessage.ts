export interface ChatMessageInfo {
  chatMessageId: number;
  chatSessionId: number;
  senderType: SenderType;
  content: string;
  createdAt: string;
}

export enum SenderType {
  User = 0,
  Assistant = 1,
}

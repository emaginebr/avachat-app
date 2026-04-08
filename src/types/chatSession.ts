export interface ChatSessionInfo {
  chatSessionId: number;
  agentId: number;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  startedAt: string;
  endedAt: string | null;
  messageCount?: number;
}

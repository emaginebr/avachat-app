export interface AgentInfo {
  agentId: number;
  name: string;
  slug: string;
  description: string | null;
  systemPrompt: string;
  status: number;
  collectName: boolean;
  collectEmail: boolean;
  collectPhone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AgentInsertInfo {
  name: string;
  description: string | null;
  systemPrompt: string;
  collectName: boolean;
  collectEmail: boolean;
  collectPhone: boolean;
}

export interface AgentChatConfigInfo {
  name: string;
  description: string | null;
  collectName: boolean;
  collectEmail: boolean;
  collectPhone: boolean;
}

export interface AgentTestMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface AgentTestResult {
  searchQuery: string;
  searchResults: string[];
  systemPrompt: string;
  messages: AgentTestMessage[];
  assistantResponse: string;
}

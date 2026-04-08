export interface KnowledgeFileInfo {
  knowledgeFileId: number;
  agentId: number;
  fileName: string;
  fileSize: number;
  processingStatus: ProcessingStatus;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export enum ProcessingStatus {
  Processing = 0,
  Ready = 1,
  Error = 2,
}

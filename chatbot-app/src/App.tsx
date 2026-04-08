import { Routes, Route } from 'react-router-dom'
import AgentListPage from './pages/admin/AgentListPage'
import AgentFormPage from './pages/admin/AgentFormPage'
import KnowledgeFilesPage from './pages/admin/KnowledgeFilesPage'
import ChatPage from './pages/chat/ChatPage'
import ChatHistoryPage from './pages/admin/ChatHistoryPage'
import NotFoundPage from './components/common/NotFoundPage'

const App = () => {
  return (
    <Routes>
      <Route path="/admin/agents" element={<AgentListPage />} />
      <Route path="/admin/agents/new" element={<AgentFormPage />} />
      <Route path="/admin/agents/:id/edit" element={<AgentFormPage />} />
      <Route path="/admin/agents/:agentId/files" element={<KnowledgeFilesPage />} />
      <Route path="/admin/agents/:agentId/history" element={<ChatHistoryPage />} />
      <Route path="/chat/:slug" element={<ChatPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

import { ChatPanel } from '../../components/chat/ChatPanel'
import { chatThreads } from '../../data/mockData'

export function TeacherChatPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Чат с учениками</h1>
      <ChatPanel threads={chatThreads} />
    </div>
  )
}

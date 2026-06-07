import { ChatPanel } from '../../components/chat/ChatPanel'
import { chatThreads } from '../../data/mockData'

export function OnlineTutorPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Онлайн-куратор</h1>
      <ChatPanel threads={chatThreads} />
    </div>
  )
}

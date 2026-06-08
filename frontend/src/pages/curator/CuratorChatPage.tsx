import { ChatPanel } from '../../components/chat/ChatPanel'
import { chatThreads } from '../../data/mockData'

export function CuratorChatPage() {
  return (
    <div className="flex flex-1 flex-col">
      <ChatPanel threads={chatThreads} />
    </div>
  )
}

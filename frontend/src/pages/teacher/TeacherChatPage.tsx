import { ChatPanel } from '../../components/chat/ChatPanel'
import { chatThreads } from '../../data/mockData'

export function TeacherChatPage() {
  return (
    <ChatPanel threads={chatThreads} />
  )
}

import { Paperclip, Send } from 'lucide-react'
import { useState } from 'react'
import type { ChatThread } from '../../types'
import { Avatar } from '../ui/Avatar'

interface ChatPanelProps {
  threads: ChatThread[]
}

export function ChatPanel({ threads }: ChatPanelProps) {
  const [activeId, setActiveId] = useState(threads[0]?.id)
  const [message, setMessage] = useState('')

  const activeThread = threads.find((t) => t.id === activeId)

  const handleSend = () => {
    if (!message.trim() || !activeThread) return
    setMessage('')
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 md:flex-row">
      {/* Список чатов */}
      <div className="w-full shrink-0 border-b border-slate-200 md:w-72 md:border-b-0 md:border-r">
        <div className="border-b border-slate-200 p-4">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Чаты</span>
        </div>
        <div className="overflow-y-auto">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveId(thread.id)}
              className={`flex w-full items-start gap-3 p-4 text-left transition ${
                activeId === thread.id ? 'bg-slate-100' : 'hover:bg-slate-50'
              }`}
            >
              <Avatar name={thread.name} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">{thread.name}</span>
                  <span className="text-xs text-slate-400">{thread.time}</span>
                </div>
                <p className="truncate text-sm text-slate-500">{thread.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Область сообщений */}
      {activeThread ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-slate-200 p-4">
            <Avatar name={activeThread.name} size="sm" />
            <span className="font-medium text-slate-900">{activeThread.name}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {activeThread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    msg.isOwn
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`mt-1 text-right text-xs ${
                      msg.isOwn ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 p-4">
            <button
              type="button"
              className="rounded p-2 text-slate-400 hover:bg-slate-100"
              aria-label="Прикрепить файл"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Сообщение..."
              className="flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={handleSend}
              className="rounded p-2 text-emerald-500 hover:bg-emerald-50"
              aria-label="Отправить"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
          Выберите чат для начала общения
        </div>
      )}
    </div>
  )
}

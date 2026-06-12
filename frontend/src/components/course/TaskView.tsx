import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { Task } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

interface TaskViewProps {
  task: Task
  totalTasks?: number
  moduleTitle?: string
}

export function TaskView({ task, totalTasks = 30, moduleTitle = 'Правописание орфографических ошибок' }: TaskViewProps) {
  const [answer, setAnswer] = useState('')
  const [timer] = useState('00:01:04')

  return (
    <div>
      <style>{`
  /* Контейнер теперь просто включает скролл при переполнении */
  .custom-scroll-container {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important; 
    display: flex !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: thin !important;
    scrollbar-color: #cbd5e1 #f1f5f9 !important;
  }
  
  /* Стили полосы прокрутки */
  .custom-scroll-container::-webkit-scrollbar {
    height: 6px !important;
  }
  .custom-scroll-container::-webkit-scrollbar-track {
    background: #f1f5f9 !important;
    border-radius: 4px !important;
  }
  .custom-scroll-container::-webkit-scrollbar-thumb {
    background: #cbd5e1 !important;
    border-radius: 4px !important;
  }
  
  /* Внутренний контейнер делает всю магию центрирования */
  .scroll-content {
    display: flex !important;
    flex-nowrap: nowrap !important;
    gap: 6px !important; 
    padding-bottom: 12px !important; 
    min-width: max-content !important; 
    
    /* 
      Этот хак заменяет justify-content: center.
      Когда места много — авто-отступы слева и справа делят его поровну (центр).
      Когда места мало — они сжимаются до 0, и контент нормально начинается слева.
    */
    margin-left: auto !important;
    margin-right: auto !important;
  }
`}</style>


      {/* Сетка с защитой от распирания */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,_1fr)_240px]">
        <div className="space-y-6 min-w-0 w-full">
          
          {/* Контейнер шагов */}
          <div className="w-full min-w-0 overflow-hidden">
            <div className="custom-scroll-container"> 
              <div className="scroll-content">
                {Array.from({ length: totalTasks }, (_, i) => i + 1).map((num) => (
                  <Link
                    key={num}
                    to={`/my-courses/1/task/${num}`}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      num === task.id
                        ? 'bg-slate-700 text-white'
                        : 'border border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card>
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
                <span className="shrink-0 text-sm text-slate-500">{task.points} балл</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-700">{task.instruction}</p>
              {task.content && (
                <p className="mb-6 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                  {task.content}
                </p>
              )}
              <Input
                placeholder="Введите ответ"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary">Пропустить</Button>
                <Button variant="blue">Ответить</Button>
              </div>
            </Card>
          </div>
        </div>

        <Card className="h-fit">
          <Link
            to="/my-courses/1"
            className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            В меню
          </Link>
          <h3 className="font-semibold text-slate-900">{moduleTitle}</h3>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-slate-600">{timer}</span>
            <Button variant="secondary" size="sm">
              Завершить
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
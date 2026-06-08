import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Plus,
  X,
  GripVertical,
  ChevronDown,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Strikethrough,
  Code,
  Undo2,
  Redo2,
  Trash2,
  Save,
  List,
  ListOrdered,
  Quote,
  Minus,
  Braces,
  BookOpen,
  CheckSquare,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type TaskType = 'lecture' | 'assignment'

interface AnswerOption {
  id: string
  text: string
  isCorrect: boolean
}

interface Step {
  id: number
  title: string
  content: string
  options: AnswerOption[]
  points: number
  answerType: 'single' | 'multiple'
}

interface LessonTask {
  id: number
  title: string
  type: TaskType
  steps: Step[]
}

// ─── Mock ─────────────────────────────────────────────────────────────────────

const makeOption = (): AnswerOption => ({
  id: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  text: '',
  isCorrect: false,
})

const MOCK_TASKS: LessonTask[] = [
  {
    id: 8,
    title: 'Введение в орфографию',
    type: 'lecture',
    steps: [
      {
        id: 1,
        title: 'Шаг 1',
        content: '<p>Орфография — раздел лингвистики, изучающий правильное написание слов.</p>',
        options: [],
        points: 0,
        answerType: 'single',
      },
      {
        id: 2,
        title: 'Шаг 2',
        content: '<p>Основные принципы русской орфографии:</p><ul><li>Морфологический</li><li>Фонетический</li><li>Традиционный</li></ul>',
        options: [],
        points: 0,
        answerType: 'single',
      },
    ],
  },
  {
    id: 9,
    title: 'Задание №9',
    type: 'assignment',
    steps: [
      {
        id: 1,
        title: 'Шаг 1',
        content: '<p>Какое слово пишется с <strong>безударной</strong> гласной?</p>',
        options: [makeOption(), makeOption(), makeOption(), makeOption()],
        points: 5,
        answerType: 'single',
      },
      {
        id: 2,
        title: 'Шаг 2',
        content: '<p>Выберите все слова с <em>непроверяемой</em> гласной:</p>',
        options: [makeOption(), makeOption(), makeOption()],
        points: 10,
        answerType: 'multiple',
      },
    ],
  },
  {
    id: 10,
    title: 'Задание №10',
    type: 'assignment',
    steps: [
      {
        id: 1,
        title: 'Шаг 1',
        content: '<p>Найдите ошибку в тексте:</p>',
        options: [makeOption(), makeOption()],
        points: 5,
        answerType: 'single',
      },
    ],
  },
]

// ─── Toolbar (Tiptap) ──────────────────────────────────────────────────────────

const toolbarBtn =
  'p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
const toolbarBtnActive = 'p-1.5 rounded bg-slate-200 text-slate-800 transition-colors'

interface ToolbarProps {
  editor: NonNullable<ReturnType<typeof useEditor>>
}

function EditorToolbar({ editor }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 px-4 py-2">
      {/* Undo / Redo */}
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={toolbarBtn}>
        <Undo2 className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={toolbarBtn}>
        <Redo2 className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Заголовки */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? toolbarBtnActive : toolbarBtn}
        title="Заголовок 1"
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? toolbarBtnActive : toolbarBtn}
        title="Заголовок 2"
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? toolbarBtnActive : toolbarBtn}
        title="Заголовок 3"
      >
        <Heading3 className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Форматирование текста */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? toolbarBtnActive : toolbarBtn} title="Жирный">
        <Bold className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? toolbarBtnActive : toolbarBtn} title="Курсив">
        <Italic className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? toolbarBtnActive : toolbarBtn} title="Зачёркнутый">
        <Strikethrough className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? toolbarBtnActive : toolbarBtn} title="Код (inline)">
        <Code className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Списки */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? toolbarBtnActive : toolbarBtn} title="Маркированный список">
        <List className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? toolbarBtnActive : toolbarBtn} title="Нумерованный список">
        <ListOrdered className="h-4 w-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Цитата / код-блок / гориз. линия */}
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? toolbarBtnActive : toolbarBtn} title="Цитата">
        <Quote className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? toolbarBtnActive : toolbarBtn} title="Блок кода">
        <Braces className="h-4 w-4" />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={toolbarBtn} title="Разделитель">
        <Minus className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Answer Option Row ────────────────────────────────────────────────────────

interface AnswerRowProps {
  option: AnswerOption
  answerType: 'single' | 'multiple'
  onChange: (id: string, text: string) => void
  onSelect: (id: string) => void
  onRemove: (id: string) => void
}

function AnswerOptionRow({ option, answerType, onChange, onSelect, onRemove }: AnswerRowProps) {
  return (
    <div className="group flex items-center gap-2">
      <button className="cursor-grab text-slate-300 hover:text-slate-500 transition-colors active:cursor-grabbing">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition-colors hover:border-slate-300">
        <input
          type="text"
          value={option.text}
          onChange={(e) => onChange(option.id, e.target.value)}
          placeholder="Введите вариант ответа"
          className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <button onClick={() => onSelect(option.id)} className="shrink-0">
          {answerType === 'single' ? (
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                option.isCorrect ? 'border-blue-500' : 'border-slate-300'
              }`}
            >
              {option.isCorrect && <div className="h-2 w-2 rounded-full bg-blue-500" />}
            </div>
          ) : (
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${
                option.isCorrect ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
              }`}
            >
              {option.isCorrect && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              )}
            </div>
          )}
        </button>
      </div>
      <button
        onClick={() => onRemove(option.id)}
        className="shrink-0 text-slate-300 opacity-0 transition-colors hover:text-red-400 group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MethodistLessonEditorPage() {
  useParams()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<LessonTask[]>(MOCK_TASKS)
  const [activeTaskId, setActiveTaskId] = useState<number>(9)
  const [lessonTitle, setLessonTitle] = useState('Урок 1. Орфография')

  // Выбор типа при добавлении
  const [showAddMenu, setShowAddMenu] = useState(false)
  const addBtnRef = useRef<HTMLDivElement>(null)

  // Активная задача
  const activeTask = tasks.find((t) => t.id === activeTaskId)!

  // Шаги активной задачи
  const [steps, setSteps] = useState<Step[]>(() => activeTask.steps)
  const [activeStepId, setActiveStepId] = useState<number>(() => steps[0]?.id ?? 1)

  const activeStep = steps.find((s) => s.id === activeStepId)

  // ── Tiptap editor ──
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({ placeholder: 'Введите текст…' }),
    ],
    content: activeStep?.content ?? '',
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML()
      setSteps((prev) =>
        prev.map((s) => (s.id !== activeStepId ? s : { ...s, content: html }))
      )
    },
  })

  // Обновляем editor.content при смене шага
  useEffect(() => {
    if (editor && activeStep) {
      const current = editor.getHTML()
      if (current !== activeStep.content) {
        editor.commands.setContent(activeStep.content ?? '')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStepId, editor])

  // Загружаем шаги при смене задачи
  useEffect(() => {
    const task = tasks.find((t) => t.id === activeTaskId)
    if (!task) return
    setSteps(task.steps)
    const firstId = task.steps[0]?.id ?? 1
    setActiveStepId(firstId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTaskId])

  // Перенумерация ID шагов
  const renumberSteps = (items: Step[]): Step[] =>
    items.map((s, i) => ({ ...s, id: i + 1 }))

  // Создать шаг для лекции (без опций) и для задания (с опциями)
  const makeStep = (type: TaskType): Step => ({
    id: 1,
    title: 'Шаг 1',
    content: '',
    options: type === 'assignment' ? [makeOption(), makeOption()] : [],
    points: type === 'assignment' ? 5 : 0,
    answerType: 'single',
  })

  // ── Task helpers ──

  const createTask = (type: TaskType) => {
    const newId = Math.max(...tasks.map((t) => t.id), 0) + 1
    const label = type === 'lecture' ? 'Лекция' : 'Задание'
    const newSteps = renumberSteps([makeStep(type)])
    setTasks((prev) => [...prev, { id: newId, title: `${label} №${newId}`, type, steps: newSteps }])
    setActiveTaskId(newId)
    setShowAddMenu(false)
  }

  const updateTaskTitle = (id: number, title: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    )
  }

  // ── Step helpers ──

  const addStep = () => {
    const newStep: Step = {
      id: steps.length + 1,
      title: '',
      content: '',
      options: activeTask.type === 'assignment' ? [makeOption(), makeOption()] : [],
      points: activeTask.type === 'assignment' ? 5 : 0,
      answerType: 'single',
    }
    const updated = renumberSteps([...steps, newStep])
    setSteps(updated)
    setActiveStepId(updated.length)
  }

  const deleteStep = () => {
    if (steps.length <= 1) return
    const filtered = steps.filter((s) => s.id !== activeStepId)
    const renumbered = renumberSteps(filtered)
    setSteps(renumbered)
    const newActiveId = Math.min(activeStepId, renumbered.length)
    setActiveStepId(newActiveId)
  }

  const updateStepField = <K extends keyof Step>(key: K, value: Step[K]) => {
    setSteps((prev) =>
      prev.map((s) => (s.id !== activeStepId ? s : { ...s, [key]: value }))
    )
  }

  // ── Option helpers ──

  const updateOption = (optId: string, text: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id !== activeStepId
          ? s
          : { ...s, options: s.options.map((o) => (o.id === optId ? { ...o, text } : o)) }
      )
    )
  }

  const selectOption = (optId: string) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id !== activeStepId) return s
        return {
          ...s,
          options: s.options.map((o) =>
            s.answerType === 'single'
              ? { ...o, isCorrect: o.id === optId }
              : { ...o, isCorrect: o.id === optId ? !o.isCorrect : o.isCorrect }
          ),
        }
      })
    )
  }

  const removeOption = (optId: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id !== activeStepId ? s : { ...s, options: s.options.filter((o) => o.id !== optId) }
      )
    )
  }

  const addOption = () => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id !== activeStepId ? s : { ...s, options: [...s.options, makeOption()] }
      )
    )
  }

  const handleExit = useCallback(() => {
    navigate(-1)
  }, [navigate])

  // Сохраняем изменения шагов обратно в tasks
  const syncStepsToTask = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id !== activeTaskId ? t : { ...t, steps }))
    )
  }

  // Закрыть меню при клике снаружи
  useEffect(() => {
    if (!showAddMenu) return
    const handler = (e: MouseEvent) => {
      if (addBtnRef.current && !addBtnRef.current.contains(e.target as Node)) {
        setShowAddMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showAddMenu])

  const isLecture = activeTask?.type === 'lecture'

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-50" style={{ fontFamily: "'Geologica', 'Manrope', sans-serif" }}>
      {/* ── Left Panel — список заданий ── */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-4">
          <input
            type="text"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => {
                syncStepsToTask()
                setActiveTaskId(task.id)
              }}
              className={`group flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                activeTaskId === task.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <GripVertical className="h-3.5 w-3.5 shrink-0 text-slate-300" />
              <input
                type="text"
                value={task.title}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation()
                  updateTaskTitle(task.id, e.target.value)
                }}
                className={`flex-1 bg-transparent outline-none ${
                  activeTaskId === task.id ? 'text-blue-700' : 'text-slate-600'
                }`}
              />
              {task.type === 'lecture' && (
                <span className="shrink-0 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                  Лекция
                </span>
              )}
              <button
                className="shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  if (tasks.length > 1) {
                    const updated = tasks.filter((t) => t.id !== task.id)
                    setTasks(updated)
                    if (activeTaskId === task.id) {
                      const next = updated[0]
                      setActiveTaskId(next.id)
                    }
                  }
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="relative" ref={addBtnRef}>
            <button
              onClick={() => setShowAddMenu((v) => !v)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-200 px-4 py-2.5 text-sm text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-500"
            >
              <Plus className="h-4 w-4" />
              Добавить
            </button>
            {showAddMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                <button
                  onClick={() => createTask('lecture')}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-blue-50"
                >
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  Лекция
                </button>
                <button
                  onClick={() => createTask('assignment')}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-blue-50"
                >
                  <CheckSquare className="h-4 w-4 text-emerald-500" />
                  Задание
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleExit}
            className="mt-2 w-full rounded-lg px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100"
          >
            Выйти из редактирования
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-5 p-6">
          {/* Заголовок — редактируемый */}
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={activeTask?.title ?? ''}
                onChange={(e) => updateTaskTitle(activeTaskId, e.target.value)}
                className="flex-1 bg-transparent text-base font-semibold text-slate-800 outline-none"
              />
              <span className="shrink-0 text-xs font-normal text-slate-400">
                {isLecture ? 'Лекция' : 'Задача'}
              </span>
            </div>
          </div>

          {/* Шаги — кружочки */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepId(step.id)
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    activeStepId === step.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {step.id}
                </button>
              ))}
              <button
                onClick={addStep}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-400 transition-colors hover:border-blue-400 hover:text-blue-500"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="ml-auto text-xs text-slate-400">
                Шаг {activeStepId} из {steps.length}
              </span>
            </div>

            {/* Название шага */}
            <div className="border-b border-slate-100 px-6 py-4">
              <input
                type="text"
                value={activeStep?.title ?? ''}
                onChange={(e) => updateStepField('title', e.target.value)}
                placeholder="Введите название шага"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Tiptap Toolbar */}
            {editor && <EditorToolbar editor={editor} />}

            {/* Tiptap Editor */}
            <div className="px-6 py-4">
              <EditorContent
                editor={editor}
                className="tiptap-editor prose prose-sm max-w-none"
              />
            </div>
          </div>

          {/* Настройки — только для заданий */}
          {!isLecture && activeStep && (
            <div className="space-y-5 rounded-xl border border-slate-200 bg-white px-6 py-5">
              <h3 className="font-semibold text-slate-800">Настройки</h3>

              {/* Тип ответа */}
              <div className="relative inline-block">
                <select
                  value={activeStep.answerType}
                  onChange={(e) => updateStepField('answerType', e.target.value as 'single' | 'multiple')}
                  className="appearance-none cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400"
                >
                  <option value="single">Один вариант ответа</option>
                  <option value="multiple">Несколько вариантов</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              {/* Варианты ответа */}
              <div>
                <h4 className="mb-3 text-sm font-medium text-slate-700">Варианты ответа</h4>
                <div className="space-y-2">
                  {activeStep.options.map((opt) => (
                    <AnswerOptionRow
                      key={opt.id}
                      option={opt}
                      answerType={activeStep.answerType}
                      onChange={updateOption}
                      onSelect={selectOption}
                      onRemove={removeOption}
                    />
                  ))}
                  <button
                    onClick={addOption}
                    className="mt-1 w-full rounded-lg border border-slate-200 py-2.5 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50"
                  >
                    Добавить вариант
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Нижняя панель */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4">
            <button
              onClick={deleteStep}
              className="flex items-center gap-1.5 rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Удалить шаг
            </button>

            <div className="flex items-center gap-4">
              {!isLecture && (
                <div className="flex items-center gap-2">
                  <label className="whitespace-nowrap text-xs text-slate-500">Баллы за правильный ответ</label>
                  <input
                    type="number"
                    min={0}
                    value={activeStep?.points ?? 0}
                    onChange={(e) => updateStepField('points', Number(e.target.value))}
                    className="w-16 rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 outline-none transition-colors focus:border-blue-400"
                  />
                </div>
              )}
              <button
                onClick={syncStepsToTask}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
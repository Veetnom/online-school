import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function EditorLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showCart={false} userName="АВ" />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
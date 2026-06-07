import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { TeacherSidebar } from './TeacherSidebar'

export function TeacherLayout() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <TeacherSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header showCart={false} userName="АВ" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

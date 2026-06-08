import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { MethodistSidebar } from './MethodistSidebar'

export function MethodistLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showCart={false} userName="МД" />
      <div className="flex flex-1 flex-col lg:flex-row">
        <MethodistSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
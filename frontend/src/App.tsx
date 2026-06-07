import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StudentLayout } from './components/layout/StudentLayout'
import { TeacherLayout } from './components/layout/TeacherLayout'
import { HomePage } from './pages/HomePage'
import { CartPage } from './pages/student/CartPage'
import { CourseDetailPage } from './pages/student/CourseDetailPage'
import { CourseLearningPage } from './pages/student/CourseLearningPage'
import { HomeworkPage } from './pages/student/HomeworkPage'
import { MyCoursesPage } from './pages/student/MyCoursesPage'
import { OnlineTutorPage } from './pages/student/OnlineTutorPage'
import { SchedulePage } from './pages/student/SchedulePage'
import { StorePage } from './pages/student/StorePage'
import { TaskPage } from './pages/student/TaskPage'
import { CourseCheckingPage } from './pages/teacher/CourseCheckingPage'
import { CourseHomeworkPage } from './pages/teacher/CourseHomeworkPage'
import { CourseInfoPage } from './pages/teacher/CourseInfoPage'
import { CourseStatisticsPage } from './pages/teacher/CourseStatisticsPage'
import { CourseStructurePage } from './pages/teacher/CourseStructurePage'
import { EssayGradingPage } from './pages/teacher/EssayGradingPage'
import { TeacherChatPage } from './pages/teacher/TeacherChatPage'
import { TeacherCheckingPage } from './pages/teacher/TeacherCheckingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<StudentLayout />}>
          <Route path="/store" element={<StorePage />} />
          <Route path="/store/:id" element={<CourseDetailPage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
          <Route path="/my-courses/:id" element={<CourseLearningPage />} />
          <Route path="/my-courses/:courseId/task/:taskId" element={<TaskPage />} />
          <Route path="/homework" element={<HomeworkPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/tutor" element={<OnlineTutorPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route element={<TeacherLayout />}>
          <Route path="/teacher/courses/:id" element={<CourseInfoPage />} />
          <Route path="/teacher/courses/:id/structure" element={<CourseStructurePage />} />
          <Route path="/teacher/courses/:id/homework" element={<CourseHomeworkPage />} />
          <Route path="/teacher/courses/:id/statistics" element={<CourseStatisticsPage />} />
          <Route path="/teacher/courses/:id/checking" element={<CourseCheckingPage />} />
          <Route path="/teacher/checking" element={<TeacherCheckingPage />} />
          <Route path="/teacher/checking/:id" element={<EssayGradingPage />} />
          <Route path="/teacher/chat" element={<TeacherChatPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

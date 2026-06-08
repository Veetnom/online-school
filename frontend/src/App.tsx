import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CuratorLayout } from './components/layout/CuratorLayout'
import { MethodistLayout } from './components/layout/MethodistLayout'
import { StudentLayout } from './components/layout/StudentLayout'
import { TeacherLayout } from './components/layout/TeacherLayout'
import { HomePage } from './pages/HomePage'
import { MethodistCourseHomeworkPage } from './pages/methodist/MethodistCourseHomeworkPage'
import { MethodistCourseInfoPage } from './pages/methodist/MethodistCourseInfoPage'
import { MethodistCourseListPage } from './pages/methodist/MethodistCourseListPage'
import { MethodistCourseStatisticsPage } from './pages/methodist/MethodistCourseStatisticsPage'
import { MethodistCourseStructurePage } from './pages/methodist/MethodistCourseStructurePage'
import { MethodistCourseTeachersPage } from './pages/methodist/MethodistCourseTeachersPage'
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
import { TeacherGroupsPage } from './pages/teacher/TeacherGroupsPage'
import { CourseHomeworkPage } from './pages/teacher/CourseHomeworkPage'
import { CourseInfoPage } from './pages/teacher/CourseInfoPage'
import { CourseStatisticsPage } from './pages/teacher/CourseStatisticsPage'
import { CourseStructurePage } from './pages/teacher/CourseStructurePage'
import { CuratorChatPage } from './pages/curator/CuratorChatPage'
import { CuratorCourseInfoPage } from './pages/curator/CuratorCourseInfoPage'
import { CuratorCourseListPage } from './pages/curator/CuratorCourseListPage'
import { CuratorCourseStatisticsPage } from './pages/curator/CuratorCourseStatisticsPage'
import { CuratorCourseStructurePage } from './pages/curator/CuratorCourseStructurePage'
import { TeacherCheckingPage } from './pages/teacher/TeacherCheckingPage'
import { TeacherCourseListPage } from './pages/teacher/TeacherCourseListPage'

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
          <Route path="/teacher/courses" element={<TeacherCourseListPage />} />
          <Route path="/teacher/courses/:id" element={<CourseInfoPage />} />
          <Route path="/teacher/courses/:id/structure" element={<CourseStructurePage />} />
          <Route path="/teacher/courses/:id/structure/:moduleId" element={<CourseStructurePage />} />
          <Route path="/teacher/courses/:id/homework" element={<CourseHomeworkPage />} />
          <Route path="/teacher/courses/:id/statistics" element={<CourseStatisticsPage />} />
          <Route path="/teacher/courses/:id/checking" element={<CourseCheckingPage />} />
          <Route path="/teacher/courses/:id/checking/:assignmentId" element={<CourseCheckingPage />} />
          <Route path="/teacher/courses/:id/checking/:assignmentId/:submissionId" element={<CourseCheckingPage />} />
          <Route path="/teacher/checking" element={<TeacherCheckingPage />} />
          <Route path="/teacher/checking/:assignmentId" element={<TeacherCheckingPage />} />
          <Route path="/teacher/checking/:assignmentId/:submissionId" element={<TeacherCheckingPage />} />
          <Route path="/teacher/groups" element={<TeacherGroupsPage />} />
        </Route>

        <Route element={<MethodistLayout />}>
          <Route path="/methodist/courses" element={<MethodistCourseListPage />} />
          <Route path="/methodist/courses/:id" element={<MethodistCourseInfoPage />} />
          <Route path="/methodist/courses/:id/structure" element={<MethodistCourseStructurePage />} />
          <Route path="/methodist/courses/:id/homework" element={<MethodistCourseHomeworkPage />} />
          <Route path="/methodist/courses/:id/teachers" element={<MethodistCourseTeachersPage />} />
          <Route path="/methodist/courses/:id/statistics" element={<MethodistCourseStatisticsPage />} />
        </Route>

        <Route element={<CuratorLayout />}>
          <Route path="/curator/courses" element={<CuratorCourseListPage />} />
          <Route path="/curator/courses/:id" element={<CuratorCourseInfoPage />} />
          <Route path="/curator/courses/:id/structure" element={<CuratorCourseStructurePage />} />
          <Route path="/curator/courses/:id/statistics" element={<CuratorCourseStatisticsPage />} />
          <Route path="/curator/chat" element={<CuratorChatPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
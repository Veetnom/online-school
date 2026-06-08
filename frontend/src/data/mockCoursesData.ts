import type { Course } from '../types'

export interface TeacherCourseInfo {
  id: string
  title: string
  studentCount: number
}

export interface MethodistCourseInfo {
  id: string
  title: string
  studentCount: number
  status: 'published' | 'draft'
}

export const teacherCourses: TeacherCourseInfo[] = [
  { id: '1', title: 'Русский язык', studentCount: 25 },
  { id: '2', title: 'Математика', studentCount: 18 },
]

export const methodistCourses: MethodistCourseInfo[] = [
  { id: '1', title: 'Русский язык', studentCount: 25, status: 'published' },
  { id: '2', title: 'Математика', studentCount: 18, status: 'published' },
  { id: '3', title: 'Химия', studentCount: 0, status: 'draft' },
]

export const allStudents = [
  { id: '1', name: 'Александр', email: 'alex@mail.ru' },
  { id: '2', name: 'Елена', email: 'elena@mail.ru' },
  { id: '3', name: 'Дмитрий', email: 'dmitry@mail.ru' },
  { id: '4', name: 'Анна', email: 'anna@mail.ru' },
  { id: '5', name: 'Иван', email: 'ivan@mail.ru' },
  { id: '6', name: 'Ольга', email: 'olga@mail.ru' },
  { id: '7', name: 'Пётр', email: 'petr@mail.ru' },
]
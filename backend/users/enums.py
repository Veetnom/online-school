from django.db import models


class RoleName(models.TextChoices):
    STUDENT = 'student', 'Ученик'
    TEACHER = 'teacher', 'Преподаватель'
    CURATOR = 'curator', 'Куратор'
    METHODIST = 'methodist', 'Методист'
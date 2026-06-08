from django.db import models


class CourseStatus(models.TextChoices):
    DRAFT = 'draft', 'Черновик'
    PUBLISHED = 'published', 'Опубликован'
    ARCHIVED = 'archived', 'Архивный'
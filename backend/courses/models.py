from django.db import models

from .enums import CourseStatus


class Course(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=500, blank=True, default='')
    full_description = models.TextField(blank=True, default='')
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=50, choices=CourseStatus.choices, default=CourseStatus.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'

    def __str__(self) -> str:
        return self.title


class CourseMethodologist(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='methodologists')
    methodologist = models.ForeignKey('users.User', on_delete=models.PROTECT, related_name='authored_courses')
    assigned_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'Методист курса'
        verbose_name_plural = 'Методисты курсов'
        unique_together = ('course', 'methodologist')

    def __str__(self) -> str:
        return f'{self.methodologist} -> {self.course}'


class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    order_number = models.IntegerField()
    open_at = models.DateTimeField(null=True, blank=True)
    close_at = models.DateTimeField(null=True, blank=True)
    min_points_to_unlock = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = 'Модуль'
        verbose_name_plural = 'Модули'
        ordering = ['order_number']

    def __str__(self) -> str:
        return f'{self.course} - {self.title}'


class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    order_number = models.IntegerField()

    class Meta:
        verbose_name = 'Урок'
        verbose_name_plural = 'Уроки'
        ordering = ['order_number']

    def __str__(self) -> str:
        return f'{self.module} - {self.title}'


class StepType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Тип шага'
        verbose_name_plural = 'Типы шагов'

    def __str__(self) -> str:
        return self.name


class Step(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='steps')
    step_type = models.ForeignKey(StepType, on_delete=models.PROTECT, related_name='steps')
    title = models.CharField(max_length=200)
    order_number = models.IntegerField()
    content = models.TextField(blank=True, default='')
    settings = models.JSONField(blank=True, default=dict)
    points_per_step = models.IntegerField(null=True, blank=True)
    open_at = models.DateTimeField(null=True, blank=True)
    close_at = models.DateTimeField(null=True, blank=True)
    time_limit_minutes = models.IntegerField(null=True, blank=True)
    deadline = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Шаг'
        verbose_name_plural = 'Шаги'
        ordering = ['order_number']

    def __str__(self) -> str:
        return f'{self.lesson} - {self.title}'
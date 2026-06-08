from django.db import models

from .enums import AttemptStatus


class StepAttempt(models.Model):
    step = models.ForeignKey('courses.Step', on_delete=models.CASCADE, related_name='attempts')
    student = models.ForeignKey('users.User', on_delete=models.PROTECT, related_name='step_attempts')
    attempt_number = models.IntegerField()
    answer = models.JSONField(blank=True, default=dict)
    status = models.CharField(max_length=50, choices=AttemptStatus.choices, default=AttemptStatus.IN_PROGRESS)
    started_at = models.DateTimeField(null=True, blank=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Попытка шага'
        verbose_name_plural = 'Попытки шагов'

    def __str__(self) -> str:
        return f'{self.student} - {self.step} (попытка {self.attempt_number})'


class CheckResult(models.Model):
    attempt = models.ForeignKey(StepAttempt, on_delete=models.CASCADE, related_name='check_results')
    reviewer = models.ForeignKey('users.User', on_delete=models.PROTECT, related_name='check_results')
    points_awarded = models.IntegerField(null=True, blank=True)
    ai_probability = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    checked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Результат проверки'
        verbose_name_plural = 'Результаты проверок'

    def __str__(self) -> str:
        return f'{self.reviewer} -> {self.attempt}'


class Comment(models.Model):
    attempt = models.ForeignKey(StepAttempt, on_delete=models.CASCADE, related_name='comments')
    reviewer = models.ForeignKey('users.User', on_delete=models.PROTECT, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self) -> str:
        return f'{self.reveiwer} -> {self.attempt}'


class AssignmentProgress(models.Model):
    assignment = models.ForeignKey('courses.Step', on_delete=models.CASCADE, related_name='progress_records')
    student = models.ForeignKey('users.User', on_delete=models.PROTECT, related_name='assignment_progress')
    status = models.CharField(max_length=50, choices=AttemptStatus.choices, default=AttemptStatus.IN_PROGRESS)
    time_spent_minutes = models.IntegerField(null=True, blank=True)
    max_earned_points = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = 'Прогресс задания'
        verbose_name_plural = 'Прогрессы заданий'
        unique_together = ('assignment', 'student')

    def __str__(self) -> str:
        return f'{self.student} - {self.assignment}'
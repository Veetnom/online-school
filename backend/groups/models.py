from django.db import models


class Group(models.Model):
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='groups')
    title = models.CharField(max_length=200)
    curator = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='curated_groups')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'

    def __str__(self) -> str:
        return self.title


class GroupTeamMember(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='team_members')
    course_team_member = models.ForeignKey('courses.CourseTeamMember', on_delete=models.PROTECT, related_name='group_memberships')

    class Meta:
        verbose_name = 'Сотрудник группы'
        verbose_name_plural = 'Сотрудники групп'
        unique_together = ('group', 'course_team_member')

    def __str__(self) -> str:
        return f'{self.course_team_member} -> {self.group}'


class Enrollment(models.Model):
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='enrollments')
    student = models.ForeignKey('users.User', on_delete=models.PROTECT, related_name='enrollments')
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress_percent = models.IntegerField(default=0)
    total_points = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Зачисление'
        verbose_name_plural = 'Зачисления'
        unique_together = ('course', 'student')

    def __str__(self) -> str:
        return f'{self.student} -> {self.course}'
from django.contrib.auth.models import AbstractUser
from django.db import models

from .enums import RoleName


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True, choices=RoleName.choices)

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'

    def __str__(self) -> str:
        return self.get_name_display()


class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.PROTECT, related_name='users')
    avatar_url = models.TextField(blank=True, default='')
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
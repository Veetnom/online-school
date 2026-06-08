from django.db import models


class AttemptStatus(models.TextChoices):
    IN_PROGRESS = 'in_progress', 'В процессе'
    SUBMITTED = 'submitted', 'Отправлено'
    CHECKED = 'checked', 'Проверено'
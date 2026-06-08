from django.db import models


class Chat(models.Model):
    curator = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='curator_chats')
    student = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='student_chats')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'
        unique_together = ('curator', 'student')

    def __str__(self) -> str:
        return f'{self.curator} - {self.student}'


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey('users.User', on_delete=models.PROTECT, related_name='messages')
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        ordering = ['sent_at']

    def __str__(self) -> str:
        return f'{self.sender}: {self.content[:50]}'
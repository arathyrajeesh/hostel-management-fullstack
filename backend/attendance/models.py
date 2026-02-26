from django.db import models
from users.models import User

class Attendance(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    present = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student.username} - {self.date}"
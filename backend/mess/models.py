from django.db import models

class MessMenu(models.Model):
    day = models.CharField(max_length=20)
    breakfast = models.CharField(max_length=100)
    lunch = models.CharField(max_length=100)
    dinner = models.CharField(max_length=100)

    def __str__(self):
        return self.day
    

from users.models import User

class MessBill(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    month = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.username} - {self.month}"
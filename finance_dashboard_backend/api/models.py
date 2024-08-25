from django.db import models

class Budget(models.Model):
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.category} - {self.amount} on {self.date}"

class Expense(models.Model):
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.description} - {self.amount} on {self.date}"

class Goal(models.Model):
    title = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2)
    deadline = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.target_amount} by {self.deadline}"

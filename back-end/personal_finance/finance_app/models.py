from django.db import models

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255)
    date = models.DateField()
    user = models.ForeignKey('auth.User', related_name='expenses', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.description} - ${self.amount}"
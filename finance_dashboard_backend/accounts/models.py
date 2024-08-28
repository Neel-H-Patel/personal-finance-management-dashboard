from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    # Add additional fields here if needed
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Custom related name for reverse relation
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # Custom related name for reverse relation
        blank=True
    )

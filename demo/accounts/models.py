from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class User(AbstractUser):
    phone_number = models.CharField(blank=True, null=True, max_length=12)

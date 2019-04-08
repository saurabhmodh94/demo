from django.db import models

# Create your models here.
from accounts.models import User


class Tweet(models.Model):
    tweet = models.CharField(max_length=240)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tweets')

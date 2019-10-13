from django.db import models

# Create your models here.

class Todo(models.Model):
    todo = models.TextField(max_length=255)
    is_done = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

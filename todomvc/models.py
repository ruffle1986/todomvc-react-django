from django.db import models
import json

class Todo(models.Model):
  id=models.AutoField(primary_key=True)
  title=models.CharField(max_length=200)
  completed=models.BooleanField()

  def __str__(self):
    return json.dumps({
      'id': self.id,
      'title': self.title,
      'completed': self.completed
    })
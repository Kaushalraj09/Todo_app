from django.db import models

# Create your models here.
class Task(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.CharField(max_length=100)

class Meta:
    db_table = 'task'

def __str__(self):
    if self.task==None:
        return "No task"
    return self.task

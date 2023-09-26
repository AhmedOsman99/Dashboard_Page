from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=255)
    mobile =models.IntegerField()
    email = models.EmailField()
    department = models.CharField(max_length=255)
    job = models.CharField(max_length=255)
    permission_group = models.CharField(max_length=255)
    
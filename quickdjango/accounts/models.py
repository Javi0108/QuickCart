from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    id_profile = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=10)


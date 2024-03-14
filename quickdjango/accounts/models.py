from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Atributos "Adicionales"
    type = models.CharField(max_length=10)


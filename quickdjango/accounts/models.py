from django.contrib.auth.models import User
from django.db import models
import json

class Profile(models.Model):
    id_profile = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=20, null=False,blank=True)
    phone = models.CharField(max_length=20, null=True)
    mobile = models.CharField(max_length=20, null=False, blank=True)
    address = models.CharField(max_length=55, null=True, blank=True)
    
    #seller
    
    sales = models.IntegerField(null=True)  # Campo para el número de ventas, que puede ser null
    
    SOCIAL_CHOICES = [
        ('Instagram', 'Instagram'),
        ('Facebook', 'Facebook'),
        ('X', 'X'),
        ('LinkedIn', 'LinkedIn'),
    ]
    socials = models.TextField(null=True)
    
    CLIENT = 'Client'
    SELLER = 'Seller'
    ROLES = [
        (CLIENT, 'Client'),
        (SELLER, 'Seller'),
    ]

    user_type = models.CharField(max_length=10, choices=ROLES, default=CLIENT)

    # Método para verificar si es vendedor
    def is_seller(self):
        return self.user_type == self.SELLER

    # Método para obtener las redes sociales como un diccionario
    def get_socials_as_dict(self):
        return json.loads(self.socials)

    # Método para establecer las redes sociales a partir de un diccionario
    def set_socials_from_dict(self, socials_dict):
        self.socials = json.dumps(socials_dict)

    def __str__(self) -> str:
        return f"Profile:\n\
            id_profile: {self.id_profile}\n\
            user: {self.user.username}\n\
            user_name: {self.user_name}\n\
            phone: {self.phone}\n\
            mobile: {self.mobile}\n\
            address: {self.address}\n\
            sales: {self.sales}\n\
            socials: {self.socials}\n\
            user_type: {self.user_type}"
    
    
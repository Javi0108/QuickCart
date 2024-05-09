from django.urls import path
from .views import OrderView

urlpatterns = [
    path('<int:order_id>/', OrderView.as_view(), name='order_view'),
    path('add/', OrderView.as_view(), name='order_add_view'),
    path('remove/<int:pk>/', OrderView.as_view(), name='order_remove_view'),
    path('update/<int:pk>/', OrderView.as_view(), name='order_update_view'),
]
    
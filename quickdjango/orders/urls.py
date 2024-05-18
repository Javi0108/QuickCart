from django.urls import path
from .views import OrderView, CheckoutSessionView, CancelPaymentView

urlpatterns = [
    path("", OrderView.as_view(), name="order_view"),
    path("add/", OrderView.as_view(), name="order_add_view"),
    path("remove/<int:pk>/", OrderView.as_view(), name="order_remove_view"),
    path("update/<int:pk>/", OrderView.as_view(), name="order_update_view"),
    path(
        "create-checkout-session/",
        CheckoutSessionView.as_view(),
        name="create_checkout_session",
    ),
    path(
        "cancel-payment/<int:order_id>/",
        CancelPaymentView.as_view(),
        name="delete_checkout_session",
    ),
]

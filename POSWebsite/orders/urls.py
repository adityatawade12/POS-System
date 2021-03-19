from django.urls import path
from . import views

urlpatterns=[
    path('items',views.menuItems1,name="items"),
    path('category',views.menuCategory,name="category"),
    path('checkout',views.checkout,name="Checkout"),
    path('check',views.check,name="check"),
]

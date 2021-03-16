from django.urls import path
from . import views

urlpatterns=[path('items',views.menuItems1,name="items"),path('checkout',views.checkout,name="Checkout")]

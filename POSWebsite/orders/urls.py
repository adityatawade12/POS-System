from django.urls import path
from . import views

urlpatterns=[path('items',views.menuItems1,name="items")]
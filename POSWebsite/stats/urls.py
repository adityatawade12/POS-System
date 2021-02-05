from django.urls import path
from . import views

urlpatterns=[path('home',views.home,name="home"),
            path('',views.home1,name="default"),
            path('menu',views.menu,name="menu"),
            path('contact',views.contact,name="contact")
            ]
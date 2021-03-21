from django.urls import path
from . import views

urlpatterns=[
    path('items',views.menuItems1,name="items"),
    path('category',views.menuCategory,name="category"),
    path('checkout',views.checkout,name="Checkout"),
    path('check',views.check,name="check"),
    path('feedback',views.feedback,name="feedback"),
    path('confirm',views.confirm,name="confirm"),
    path('getAddresses',views.getAddress,name="getAddress"),
    path('updateAddresses',views.updateAddress,name="updateAddress")
]

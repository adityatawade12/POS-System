from django.shortcuts import render,redirect
from accounts.views import curuser
from orders.views import menuItems
from orders.views import menuCart
from orders.views import menuCategory

# Create your views here.
def home(request):

    us=curuser(request)
    return render(request,'home.html',{'us':us})

def home1(request):
    return redirect('/home')

def menu(request):
    items=menuItems()
    category = menuCategory(items)
    # print(items)
    # print(category)

    us=curuser(request)
    cartItems=menuCart(request)
    
    return render(request,'menu.html',{'us':us,'items':items,'cartitems':cartItems, 'category':category})

def contact(request):
    us=curuser(request)
    return render(request,'contact.html',{'us':us})

def nav(request):
    us=curuser(request)
    return render(request,'nav.html',{'us':us})



def feedback(request):
    us=curuser(request)
    return render(request,'feedback.html',{'us':us})

from django.shortcuts import render,redirect
from accounts.views import curuser
from orders.views import menuItems


# Create your views here.
def home(request):

    us=curuser()
    return render(request,'home.html',{'us':us})

def home1(request): 
    return redirect('/home')

def contact(request):
    us=curuser()
    return render(request,'contact.html',{'us':us})

def nav(request):
    us=curuser()
    return render(request,'nav.html',{'us':us})

def menu(request):
    items=menuItems()
    print(items)
    us=curuser()
    return render(request,'menu.html',{'us':us,'items':items})
from django.shortcuts import render,redirect
from accounts.views import curuser
from orders.views import menuItems
<<<<<<< HEAD
=======

>>>>>>> 7d7e207d6e94cbaef6982c3b656939e2ccd6ea16

# Create your views here.
def home(request):

    us=curuser()
    return render(request,'home.html',{'us':us})

<<<<<<< HEAD
def home1(request):
    return redirect('/home')

def menu(request):
    items=menuItems()
    print(items)
    us=curuser()
    return render(request,'menu.html',{'us':us,'items':items})

=======
def home1(request): 
    return redirect('/home')

>>>>>>> 7d7e207d6e94cbaef6982c3b656939e2ccd6ea16
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
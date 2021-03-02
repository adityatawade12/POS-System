from django.shortcuts import render,redirect
from accounts.views import curuser


# Create your views here.
def home(request):

    us=curuser()
    return render(request,'home.html',{'us':us})

def home1(request):
    
    
    return redirect('/home')

def menu(request):
    us=curuser()
    return render(request,'menu.html',{'us':us})

def contact(request):
    us=curuser()
    return render(request,'contact.html',{'us':us})

def nav(request):
    us=curuser()
    return render(request,'nav.html',{'us':us})
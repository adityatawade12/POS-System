from django.shortcuts import render,redirect

# Create your views here.
def login(request):
    return render(request,'login.html')

def signup(request):
    return render(request,'signup.html')

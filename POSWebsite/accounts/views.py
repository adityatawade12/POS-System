from django.shortcuts import render,redirect
import firebase_admin
from firebase_admin import credentials,auth
from firebase_admin import firestore
from django.http import JsonResponse
from datetime import datetime, timedelta

import time
import pyrebase
cred = credentials.Certificate(r'accounts\mkstrial-91474-firebase-adminsdk-ks5kv-b1e2114ee3.json')
firebase_admin.initialize_app(cred)
config = {
  "apiKey": "AIzaSyCRdXgH7cvG87cBYmEbgekw-uQGjBdm4D8",
    "authDomain": "mkstrial-91474.firebaseapp.com",
    "databaseURL": "https://mkstrial-91474-default-rtdb.firebaseio.com",
    "serviceAccount": "accounts/mkstrial-91474-firebase-adminsdk-ks5kv-b1e2114ee3.json",
    "storageBucket": "mkstrial-91474.appspot.com",
}
pirebase = pyrebase.initialize_app(config)
authe = pirebase.auth()
# user=authe.current_user
# Create your views here.
def login(request):
    if request.method =="POST":
        email=request.POST.get("email")
        password=request.POST.get("password")
        try:
            user = authe.sign_in_with_email_and_password(email,password)
            print(user)
        except:
            message="invalid credentials"
            return render(request,"login.html",{"messg":message})
        #print(user['idToken'])
        session_id=user['idToken']
        request.session['uid']=str(session_id)
        # us=authe.current_user
        # return render(request, "menu.html",{"e":email,"us":us})
        return redirect('/menu')
    else:
        
        us=authe.current_user
        return render(request, "login.html",{"us":us})

def signup(request):
    if request.method=="POST":
        try:
            name=request.POST.get("name")
            email=request.POST.get("email")
            password=request.POST.get("password")        
            phone=request.POST.get("phone")
            user = auth.create_user(
            email=email,
            email_verified=False,
            phone_number=phone,
            password=password,
            display_name=name,        
            disabled=False)
            
            user = authe.sign_in_with_email_and_password(email,password)
            return redirect('/menu')
        except:
            return redirect('/accounts/signup')
    else:    
        us=authe.current_user
        return render(request,'signup.html',{"us":us})


def logout(request):
    try:
        del request.session['uid']
    except:
        pass
    authe.current_user=None
    return redirect('/home')


def curuser(request):
    try:
        x=authe.get_account_info(request.session['uid'])
    except:
        x="null"
    print("user authe",x)
    return authe.current_user

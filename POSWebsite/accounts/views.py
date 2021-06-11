from django.shortcuts import render,redirect
import firebase_admin
from firebase_admin import credentials,auth
from firebase_admin import firestore
from django.http import JsonResponse
from datetime import datetime, timedelta

import time
import pyrebase
cred = credentials.Certificate(r'')
firebase_admin.initialize_app(cred)
config = {
  "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "serviceAccount": "",
    "storageBucket": "",
}
db = firestore.client()
pirebase = pyrebase.initialize_app(config)
authe = pirebase.auth()
# user=authe.current_user
# Create your views here.
db = firestore.client()

msg = ''

def login(request):
    if request.method =="POST":
        email=request.POST.get("email")
        password=request.POST.get("password")
        try:
            user = authe.sign_in_with_email_and_password(email,password)
            print(user)
        except:
            message="Invalid Credentials! Please try again."
            return render(request,"login.html",{"message":msg})
        #print(user['idToken'])
        session_id=user['idToken']
        request.session['uid']=str(session_id)
        us=curuser(request)
        
        return redirect('/menu')
    else:
        us=curuser(request)
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
            session_id=user['idToken']

            request.session['uid']=str(session_id)
            
            us=curuser(request)
            data = {
            u'cart':[],
            u'Addresses':[],
            u'PastOrders':[]
            }
            db.collection(u'users').document(us['localId']).set(data)
            return JsonResponse({"success": 'yes'})
            # return redirect('/menu')

        except Exception as e:
            print(str(e))
            return JsonResponse({"success": 'no',"error":str(e)})
            # return redirect('/accounts/signup')
    else:    
        us=curuser(request)
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
        print("sbdkjna",x)
        print("-----",authe.current_user)
        return x['users'][0]
    except:
        x="null"
        return None
    # print("user authe",x)
    # return authe.current_user
    return authe.get_account_info(request.session['uid'])

from django.shortcuts import render
import accounts.views  
from firebase_admin import firestore
import json
import datetime
from django.http import HttpResponse,JsonResponse
from urllib import parse
# from accounts.views import curuser
from accounts.views import *


# Create your views here.
db = firestore.client()


def menuItems():
    docs = db.collection(u'dishes').stream()
    dishes=[]
    for doc in docs:
        dishes.append(doc.to_dict())
    return dishes

def menuCategory(dishes):
    cat=[]
    for item in dishes:
        if item['Category'] not in cat:
            cat.append(item['Category'])
    # print(cat)
    return cat

def menuItems1(request):
    docs = db.collection(u'dishes').stream()
    dishes=[]
    for doc in docs:
        dishes.append(doc.to_dict())
    dishes1 = json.dumps(dishes)    
    print(dishes1)
    return HttpResponse(dishes1)

def checkout(request):
    cart = json.loads(request.POST.get('cart'))
    us=curuser(request)
    # print(us['localId'])
    data = {
    u'cart': cart,
    
}
    db.collection(u'users').document(us['localId']).set(data)
    for x in cart:
        print(x)
    return JsonResponse({
        'key_1':'value_1',
        'operation_status': 'ok or error',
        
    })

def menuCart(request):
    # print(us['localId'])
    us=curuser(request)
    if us!=None:
        doc_ref = db.collection(u'users').document(us['localId'])

        doc = doc_ref.get()
        if doc.exists:
            cartDoc=doc.to_dict()
            try: 
                return cartDoc['cart']
            except:
                return None
        else:
            print(u'No such document!')

            return None
        
    else:
        return None

def check(request):
    us=curuser(request)
    print("RUnningh!")
    cart=menuCart(request)

    return render(request,'checkout.html',{"us":us,"cart":cart})

def feedback(request):
    if request.method=="POST":
        subject=request.POST.get("subject")
        fname=request.POST.get("fname")
        lname=request.POST.get("lname")
        num=request.POST.get("num")
        email=request.POST.get("email")
        date=request.POST.get("date")
        time=request.POST.get("time")
        msg=request.POST.get("msg")
        timestamp=datetime.now()
    feed = {
        u'subject' : subject,
        u'fname' : fname,
        u'lname' : lname,
        u'num' : num,
        u'email' : email,
        u'date' : date,
        u'time' : time,
        u'msg' : msg,
        u'timestamp':timestamp
    }
    db.collection(u'feedbacks').add(feed)
    return render(request,"feedback.html")
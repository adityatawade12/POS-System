from django.shortcuts import render,redirect
import accounts.views  
from firebase_admin import firestore
import json
import datetime
from django.http import HttpResponse,JsonResponse
from urllib import parse
# from accounts.views import curuser
from accounts.views import *
import datetime

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
    # print(dishes1)
    return HttpResponse(dishes1)

def checkout(request):
    cart = json.loads(request.POST.get('cart'))
    us=curuser(request)
    # print(us['localId'])
    data = {
    u'cart': cart,
    
    }
    db.collection(u'users').document(us['localId']).update(data)
    
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
   
    cart=menuCart(request)
    # print(len(cart))
    if us==None:
        return redirect('/accounts/login')
    else:
        currorder = db.collection(u'currentOrders').where(u'user_id', u'==', us['localId']).get()
        past = db.collection(u'pastOrders').where(u'user_id', u'==', us['localId']).get()

        if len(currorder) != 0:
            return redirect('/orders/history')
        # elif cart==None:
        #     return redirect('/accounts/login')
        elif len(cart)==0:
            return redirect('/menu')
    
    empty_past = False
    empty_curr = False
    
    if len(past) == 0:
        empty_past = True
    if len(currorder) == 0:
        empty_curr = True
        print('no curr orders')
    
    return render(request,'checkout.html',{"us": us,"cart": cart, "emptyPast": empty_past, "emptyCurr": empty_curr})


def confirm(request):
    if request.method=="POST":
        try:
            cart = json.loads(request.POST.get('cart'))
            address=request.POST.get('address')
            loc =json.loads(request.POST.get('loc'))
            total=float(request.POST.get('grnt'))
            
            timestamp=datetime.datetime.now()
            us=curuser(request)
            # print(type(cart))
            data = {
            u'cart': cart,
            u'user_email':  us['email'],
            u'user_name':us['displayName'],
            u'user_id':us['localId'],
            u'address': address,
            u'loc':loc,
            u'timestamp':timestamp,
            u'total':total,
            u'delivered':False,
            u'notify': int(1)
            }
            db.collection(u'currentOrders').add(data)

            db.collection(u'users').document(us['localId']).update({u'cart':[]})
            return JsonResponse({

                'operation_status': 'ok'
            })
        except Exception as e:
            print(e)
            
            return JsonResponse({
                
                'operation_status': 'error'
                
            })

def getAddress(request):
    # print(us['localId'])

    us=curuser(request)
    if us!=None:
        doc_ref = db.collection(u'users').document(us['localId'])

        doc = doc_ref.get()
        try: 
            if doc.exists:
                addDoc=doc.to_dict()
                n=json.dumps(addDoc['Addresses'])
                return JsonResponse({"add":n})
            # else:
            #     print(u'No such document!')
                # return JsonResponse({"status":"error"})
        except:
            return JsonResponse({"status":"error"})
        
    else:
        return None

def updateAddress(request):
    us=curuser(request)
    if us!=None:
        doc_ref = db.collection(u'users').document(us['localId'])

        if request.method=="POST":
                try:
                    
                    address=json.loads(request.POST.get('add'))
                    # loc =json.loads(request.POST.get('loc'))
                    # print("xxx1",address,loc)
                    # from firebase_admin import firestore              
                    doc_ref.update({u'Addresses': address})
                    return JsonResponse({
                            
                            'operation_status': 'ok'
                            
                        })
                except:
                    return JsonResponse({
                        
                        'operation_status': 'error'
                        
                    })
    
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
        timestamp=datetime.datetime.now()
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

def currOrders(request):
    us=curuser(request)
    if us!=None:
        doc1 = db.collection(u'currentOrders').where("user_id","==",us['localId']).stream()
        doc2 = db.collection(u'pastOrders').where("user_id","==",us['localId']).stream()
        past = []
        curr = {}
        for d in doc1:
            if d.to_dict()['user_id'] == us['localId']:
                curr = d.to_dict()

        for d in doc2:
            # print(d)
            try:
                if d.to_dict()['user_id'] == us['localId']:
                    past.append(d.to_dict())
            except:
                pass


        # print("current orders:",curr)
        # print("past orders:",past)

        return render(request,'history.html',{"us":us,"currOrder":curr, "pastOrders":past})
    else:
        return redirect('/accounts/login')
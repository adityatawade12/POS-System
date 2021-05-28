from django.shortcuts import render,redirect
from accounts.views import curuser
from orders.views import menuItems
from orders.views import menuCart
from orders.views import menuCategory
# from orders.views import currOrders
import requests,json
from django.http import JsonResponse
from orders.views import db

# Create your views here.
def home(request):

    us=curuser(request)

    docs = db.collection(u'feedbacks')
    fbs = docs.where(u'display', u'==', True).stream()

    feedbacks=[]
    for doc in fbs:
        feedbacks.append(doc.to_dict())
    # print(feedbacks)

    return render(request,'home.html',{'us':us,'feeds':feedbacks})

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
    docs = db.collection(u'openingHours').stream()
    timing=[]
    for doc in docs:
        timing.append(doc.to_dict())
    position=[1, 2, 3, 4, 5, 6, 7]
    # print("timing: ",timing)
    # docs = db.collection(u'timing').document('scM7tbnSbtdqlYnr5Pxe')

    # timing=docs.get().to_dict()
    # print("to dict",timing)

    return render(request,'contact.html',{'us':us,'timing':timing, 'position':position})

def nav(request):
    us=curuser(request)
    return render(request,'nav.html',{'us':us})

def feedback(request):
    us=curuser(request)
    return render(request,'feedback.html',{'us':us})

def php(request):
    
    # print(request.POST.get('url'))
    r = requests.get(request.POST.get('url')) 
  
    # check status code for response received 
    # success code - 200 
    # print(json.loads(r.text)) 
    return JsonResponse(json.loads(r.text))
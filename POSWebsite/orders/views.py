from django.shortcuts import render
import accounts.views  
from firebase_admin import firestore
import json
from django.http import HttpResponse

# Create your views here.

db=firestore.client()

def menuItems():
    docs = db.collection(u'dishes').stream()
    dishes=[]
    for doc in docs:
        dishes.append(doc.to_dict())
    return dishes

def menuItems1(request):
    docs = db.collection(u'dishes').stream()
    dishes=[]
    for doc in docs:
        dishes.append(doc.to_dict())
    dishes1 = json.dumps(dishes)    
    print(dishes1)
    return HttpResponse(dishes1)

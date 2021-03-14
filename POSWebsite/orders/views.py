from django.shortcuts import render

# Create your views here.
import accounts.views
from firebase_admin import firestore
# Create your views here.

db=firestore.client()

def menuItems():
    docs = db.collection(u'dishes').stream()
    dishes=[]
    for doc in docs:
        dishes.append(doc.to_dict())
    return dishes

def checkout(request):
    return render(request,'checkout.html')
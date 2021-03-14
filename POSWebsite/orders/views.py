from django.shortcuts import render
import accounts.views  
from firebase_admin import firestore
# Create your views here.
<<<<<<< HEAD
=======
import accounts.views
from firebase_admin import firestore
# Create your views here.
>>>>>>> 7d7e207d6e94cbaef6982c3b656939e2ccd6ea16

db=firestore.client()

def menuItems():
    docs = db.collection(u'dishes').stream()
    dishes=[]
    for doc in docs:
        dishes.append(doc.to_dict())
    return dishes
<<<<<<< HEAD
    
    
=======

def checkout(request):
    return render(request,'checkout.html')
>>>>>>> 7d7e207d6e94cbaef6982c3b656939e2ccd6ea16

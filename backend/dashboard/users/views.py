from django.shortcuts import render
from helper.crud import getById, addInstance, editInstance, deleteInstance
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User

# Create your views here.

@api_view(['post'])
def addUser(request):
    data, http_status = addInstance(request, UserSerializer)
    return Response(data=data, status=http_status)

@api_view(['get'])
def getUser(request, id):
    data, http_status = getById(id, User, UserSerializer)
    return Response(data=data, status=http_status)

@api_view(["put"])
def editUser(request, id):
    data, http_status = editInstance(request, id, User, UserSerializer)
    return Response(data=data, status=http_status)

@api_view(["delete"])
def deleteUser(request, id):
    data, http_status = deleteInstance(id, User)
    return Response(data=data, status=http_status)


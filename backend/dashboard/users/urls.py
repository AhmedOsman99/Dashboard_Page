from django.urls import path
from .views import addUser, getUser, editUser, deleteUser

urlpatterns = [
    path('add/', addUser),
    path('<int:id>/', getUser),
    path('edit/<int:id>/', editUser),
    path('delete/<int:id>/', deleteUser)
]

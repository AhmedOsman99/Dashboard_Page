from rest_framework import status
from django.shortcuts import get_object_or_404


def getAll(model, modelSerializer):
    try:
        all_instances = model.objects.all()
        model_serializer = modelSerializer(
            all_instances, many=True)
        data = model_serializer.data
        http_status = status.HTTP_200_OK
    except Exception as e:
        data = {"Error": f"An error occurred => {e}"}
        http_status = status.HTTP_404_NOT_FOUND
    return data, http_status


def getById(id, model, modelSerializer):
    try:
        instance = get_object_or_404(model, id=id)
        model_serializer = modelSerializer(
            instance)
        data = model_serializer.data
        http_status = status.HTTP_200_OK
    except Exception as e:
        data = {"Error": f"An error occurred => {e}"}
        http_status = status.HTTP_404_NOT_FOUND
    return data, http_status


def addInstance(request, modelSerializer):
    try:
        model_serializer = modelSerializer(data=request.data)
        if model_serializer.is_valid():
            model_serializer.save()
            data = model_serializer.data
            http_status = status.HTTP_201_CREATED
        else:
            data = model_serializer.errors
            http_status = status.HTTP_400_BAD_REQUEST
    except Exception as e:
        data = {"Error": f"An error occurred => {e}"}
        http_status = status.HTTP_400_BAD_REQUEST
    return data, http_status


def editInstance(request, id, model, modelSerializer):
    try:
        product = model.objects.get(id=id)
        product_serializer = modelSerializer(instance=product, data=request.data)
        if product_serializer.is_valid():
            product_serializer.save()
            data = product_serializer.data
            http_status = status.HTTP_202_ACCEPTED
        else:
            data = product_serializer.errors
            http_status = status.HTTP_400_BAD_REQUEST
    except Exception as e:
        data = {"Error": f"An error occurred => {e}"}
        http_status = status.HTTP_404_NOT_FOUND
    return data, http_status
    

def deleteInstance(id, model):
    try:
        product = model.objects.get(id=id)
        product.delete()
        data = {"message": "Product deleted successfully"}
        http_status = status.HTTP_200_OK
    except Exception as e:
        data = {"Error": f"An error occurred => {e}"}
        http_status = status.HTTP_404_NOT_FOUND
    return data, http_status
    


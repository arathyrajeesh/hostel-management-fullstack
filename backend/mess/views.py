from rest_framework.viewsets import ModelViewSet
from .models import MessMenu, MessBill
from .serializers import MessMenuSerializer, MessBillSerializer

class MessMenuViewSet(ModelViewSet):
    queryset = MessMenu.objects.all()
    serializer_class = MessMenuSerializer

class MessBillViewSet(ModelViewSet):
    queryset = MessBill.objects.all()
    serializer_class = MessBillSerializer
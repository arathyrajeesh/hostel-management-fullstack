from rest_framework.viewsets import ModelViewSet
from .models import Complaint
from .serializers import ComplaintSerializer

class ComplaintViewSet(ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
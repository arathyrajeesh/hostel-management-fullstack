from rest_framework.viewsets import ModelViewSet
from .models import Complaint
from .serializers import ComplaintSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Complaint

class ComplaintViewSet(ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_complaints(request):

    complaints = Complaint.objects.filter(student=request.user)

    data = list(complaints.values())

    return Response(data)
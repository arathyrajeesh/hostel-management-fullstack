from rest_framework.viewsets import ModelViewSet
from .models import Notice
from .serializers import NoticeSerializer

class NoticeViewSet(ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
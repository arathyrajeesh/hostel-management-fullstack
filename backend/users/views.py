from rest_framework.viewsets import ModelViewSet
from .models import StudentProfile
from .serializers import StudentProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from .models import User, StudentProfile
from rooms.models import Room
class StudentProfileViewSet(ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    

class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)

        return Response({
            "token": str(refresh.access_token),
            "role": user.role,
            "username": user.username
        })
        


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_student(request):

    if request.user.role != "admin":
        return Response({"error": "Only admin can add students"}, status=403)

    username = request.data.get("username")
    password = request.data.get("password")
    phone = request.data.get("phone")
    room_id = request.data.get("room")

    user = User.objects.create(
        username=username,
        password=make_password(password),
        role="student"
    )

    room = Room.objects.get(id=room_id)

    StudentProfile.objects.create(
        user=user,
        phone=phone,
        room=room
    )

    return Response({"message": "Student created"})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_profile(request):

    if request.user.role != "student":
        return Response({"error": "Only students allowed"}, status=403)

    profile = StudentProfile.objects.get(user=request.user)

    data = {
        "username": request.user.username,
        "room": profile.room.room_number if profile.room else "Not Assigned",
        "phone": profile.phone
    }

    return Response(data)
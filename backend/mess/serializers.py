from rest_framework import serializers
from .models import MessMenu, MessBill

class MessMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessMenu
        fields = '__all__'

class MessBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessBill
        fields = '__all__'
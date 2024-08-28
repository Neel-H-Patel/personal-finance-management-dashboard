from rest_framework import serializers
from .models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'user', 'name', 'amount', 'category', 'date']  # Include necessary fields
        read_only_fields = ['user']  # Set 'user' as read-only, as it will be set automatically

    def create(self, validated_data):
        # Override the create method to set the user field to the current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
from rest_framework import serializers
from .models import Budget

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'user', 'name', 'amount', 'start_date', 'end_date']  # List explicitly
        read_only_fields = ['user']  # Example read-only fields
        
        def create(self, validated_data):
        # Set the user field to the current user
            validated_data['user'] = self.context['request'].user
            return super().create(validated_data)
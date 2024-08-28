from rest_framework import serializers
from .models import Goal

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = [
            'id',         # Primary key
            'user',       # Foreign key to the user
            'name',       # Name of the goal
            'target_amount',  # Target amount to reach
            'current_amount', # Current amount saved
            'due_date'    # Due date for the goal
        ]
        read_only_fields = ['user']  # Automatically set from the context

    def create(self, validated_data):
        # Set the user field to the current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
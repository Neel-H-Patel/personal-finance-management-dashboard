from rest_framework import serializers
from .models import Budget

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'name', 'amount', 'start_date', 'end_date']  # List explicitly
        read_only_fields = ['id']  # Example read-only fields
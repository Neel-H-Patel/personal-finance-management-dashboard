from rest_framework import generics
from .models import Budget
from .serializers import BudgetSerializer
from rest_framework.permissions import IsAuthenticated

class BudgetListCreateView(generics.ListCreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BudgetRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure that users can only access their own budget items
        return Budget.objects.filter(user=self.request.user)
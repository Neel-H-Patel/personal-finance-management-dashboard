from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Goal
from .serializers import GoalSerializer

class GoalListCreateView(generics.ListCreateAPIView):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)


from rest_framework import generics
from .models import Goal
from .serializers import GoalSerializer
from rest_framework.permissions import IsAuthenticated

class GoalListCreateView(generics.ListCreateAPIView):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
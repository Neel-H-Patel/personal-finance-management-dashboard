from django.urls import path
from .views import GoalListCreateView, GoalDetailView

urlpatterns = [
    path('', GoalListCreateView.as_view(), name='goal-list-create'),  # List and create goals
    path('<int:pk>/', GoalDetailView.as_view(), name='goal-detail'),  # Retrieve, update, delete specific goal
]

from django.urls import path
from .views import GoalListCreateView, GoalRetrieveDestroyView

urlpatterns = [
    path('goals/', GoalListCreateView.as_view(), name='goal-list-create'),
    path('goals/<int:pk>/', GoalRetrieveDestroyView.as_view(), name='goal-detail-delete'),  # URL for retrieve and delete
]
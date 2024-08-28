
from django.urls import path
from .views import GoalListCreateView

urlpatterns = [
    path('goals/', GoalListCreateView.as_view(), name='goal-list-create'),
]
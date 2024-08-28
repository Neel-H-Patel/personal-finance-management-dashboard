from django.urls import path
from .views import BudgetListCreateView, BudgetRetrieveDestroyView

urlpatterns = [
    path('budgets/', BudgetListCreateView.as_view(), name='budget-list-create'),
    path('budgets/<int:pk>/', BudgetRetrieveDestroyView.as_view(), name='budget-detail-delete'),  # URL for delete
]
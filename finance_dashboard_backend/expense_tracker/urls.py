from django.urls import path
from .views import ExpenseListCreateView, ExpenseRetrieveDestroyView

urlpatterns = [
    path('expenses/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseRetrieveDestroyView.as_view(), name='expense-detail-delete'),  # Endpoint for retrieve and delete
]
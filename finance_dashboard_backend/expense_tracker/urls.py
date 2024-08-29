from django.urls import path
from .views import ExpenseListCreateView, ExpenseDetailView

urlpatterns = [
    path('', ExpenseListCreateView.as_view(), name='expense-list-create'),  # List and create expenses
    path('<int:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),  # Retrieve, update, delete specific expense
]
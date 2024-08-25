from django.urls import path
from .views import BudgetListCreate, BudgetRetrieveUpdateDestroy, ExpenseListCreate, ExpenseRetrieveUpdateDestroy, GoalListCreate, GoalRetrieveUpdateDestroy

urlpatterns = [
    path('budgets/', BudgetListCreate.as_view(), name='budget-list-create'),
    path('budgets/<int:pk>/', BudgetRetrieveUpdateDestroy.as_view(), name='budget-retrieve-update-destroy'),
    path('expenses/', ExpenseListCreate.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseRetrieveUpdateDestroy.as_view(), name='expense-retrieve-update-destroy'),
    path('goals/', GoalListCreate.as_view(), name='goal-list-create'),
    path('goals/<int:pk>/', GoalRetrieveUpdateDestroy.as_view(), name='goal-retrieve-update-destroy'),
]
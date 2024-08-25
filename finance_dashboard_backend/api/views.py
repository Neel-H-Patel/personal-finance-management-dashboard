from rest_framework import generics
from .models import Budget, Expense, Goal
from .serializers import BudgetSerializer, ExpenseSerializer, GoalSerializer

class BudgetListCreate(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class BudgetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class ExpenseListCreate(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class GoalListCreate(generics.ListCreateAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class GoalRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
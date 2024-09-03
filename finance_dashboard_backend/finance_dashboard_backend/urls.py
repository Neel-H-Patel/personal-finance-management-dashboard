"""
URL configuration for finance_dashboard_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import path, include
from .views import set_csrf_token

def health_check(request):
    return JsonResponse({'status': 'ok'})

def redirect_to_login(request):
    return redirect('api/auth/login/')

urlpatterns = [
    path('api/set-csrf-token/', set_csrf_token, name='set-csrf-token'),
    path('', redirect_to_login),
    path('health/', health_check),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/budgets/', include('budget_planner.urls')),
    path('api/expenses/', include('expense_tracker.urls')),
    path('api/goals/', include('goal_tracker.urls')),
]

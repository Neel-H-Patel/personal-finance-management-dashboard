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
from django.db import connection
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import path, include

def health_check(request):
    # Add logging here to capture the request
    print(f"Health check accessed: {request.method}, {request.headers}")

    try:
        # Check database connectivity
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            result = cursor.fetchone()

        # If the query succeeds, consider the database connection healthy
        if result:
            return JsonResponse({"status": "ok"}, status=200)
        else:
            return JsonResponse({"status": "error"}, status=500)

    except Exception as e:
        # Log the exception and return a 500 status code
        print(f"Health check failed: {str(e)}")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

def redirect_to_login(request):
    return redirect('api/auth/login/')

urlpatterns = [
    path('', redirect_to_login),
    path('health/', health_check),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/budgets/', include('budget_planner.urls')),
    path('api/expenses/', include('expense_tracker.urls')),
    path('api/goals/', include('goal_tracker.urls')),
]

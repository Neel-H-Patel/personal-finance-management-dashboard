# views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token

def set_csrf_token(request):
    """
    View to generate and set a CSRF token in the response cookies.
    """
    response = JsonResponse({'detail': 'CSRF cookie set'})  # Response content can be adjusted as needed
    csrf_token = get_token(request)  # Generate CSRF token using Django's CSRF middleware
    response.set_cookie(
        'csrftoken', csrf_token, httponly=False, secure=True, samesite='Lax'
    )
    return response
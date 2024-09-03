# views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token


def set_csrf_token(request):
    # This view simply sets the CSRF token and returns a response
    response = JsonResponse({'detail': 'CSRF token initialized'})
    csrf_token = get_token(request)
    response.set_cookie(
        'csrftoken',
        csrf_token,
        httponly=False,
        secure=True,
        samesite='Lax',
        path='/',
        domain='.apifinancedashboard.com'
    )
    return response
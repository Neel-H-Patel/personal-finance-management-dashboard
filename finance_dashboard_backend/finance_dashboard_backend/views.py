# views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token

def set_csrf_token(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    csrf_token = get_token(request)

    # Set the CSRF cookie with Path and Domain
    response.set_cookie(
        'csrftoken',
        csrf_token,
        httponly=False,        # Allows access to the cookie via JavaScript if needed
        secure=True,           # Use True if your site is served over HTTPS
        samesite='Lax',        # Use Lax for most scenarios or None if you require full cross-origin access
        path='/',              # Makes the cookie accessible across all paths
        domain='.apifinancedashboard.com'  # Leading dot allows all subdomains
    )

    return response
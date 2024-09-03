from django.contrib.auth import get_user_model, login, logout
from django.middleware import csrf
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import LoginSerializer, RegisterSerializer

# Get the correct User model
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data['username'])
        login(request, user)  # Log the user in to create a session

        # Generate CSRF token and set it in a cookie
        csrf_token = csrf.get_token(request)
        response.data = {
            'message': 'Registration successful and logged in',
            'user': user.username
        }
        response.set_cookie(
            'csrftoken', csrf_token,
            httponly=False, secure=True, samesite='Lax'
        )

        return response

class LoginView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)  # Log the user in to create a session

        # Generate CSRF token and set it in a cookie
        csrf_token = csrf.get_token(request)
        response = Response({
            'message': 'Login successful',
            'user': user.username
        }, status=status.HTTP_200_OK)
        response.set_cookie(
            'csrftoken', csrf_token,
            httponly=False, secure=True, samesite='Lax'
        )

        return response

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        response = Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        response.delete_cookie('csrftoken')  # Clear CSRF token on logout
        return response
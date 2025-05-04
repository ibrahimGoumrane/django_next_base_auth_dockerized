from rest_framework.decorators import api_view
from .serializer import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout 
from rest_framework import viewsets
from .models import User
from .decorators import is_authenticated, is_client
# Extract the views from the serializer 
class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Handler for user registration
@api_view(["POST"])
@is_client
def user_registration(request):
    """
    Handle user registration.
    """
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    email = request.data.get("email")
    password = request.data.get("password")

    if not first_name or not last_name or not email or not password:
        return Response({"error": "email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    # Create a new user Using the UserSerializer
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)  # Log in the user after registration
        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Handler for user login
@api_view(["POST"])
@is_client
def user_login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Authenticate the user
    user = authenticate(request, username=email, password=password)
    if user:
        login(request, user)
        # Return the serialized data
        user_data = UserSerializer(user).data
        return Response( user_data , status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

# Handler for user logout
@api_view(["POST"])
@is_authenticated
def user_logout(request):
    """
    Handle user logout.
    """
    logout(request)
    return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)

# Handler to check if the user is authenticated
@api_view(["GET"])
def check_auth(request):
    """
    Check if the user is authenticated.
    """
    user = request.user  # Get the currently authenticated user
    if not user.is_authenticated:
        return Response({"message": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)
    user_data = UserSerializer(user).data  # Serialize user data
    return Response(user_data, status=status.HTTP_200_OK)

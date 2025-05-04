from rest_framework.response import Response
from rest_framework import status
from functools import wraps



def is_authenticated(view_func):
    """
    Decorator to check if the user is authenticated.
    """
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"error": "User is not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)
        return view_func(request, *args, **kwargs)
    return _wrapped_view

def is_client(view_func):
    """
    Decorator to check if the request is coming from a valid client.
    """
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        print(request.user.is_authenticated)
        if  request.user.is_authenticated:
            return Response({"error": "User is authenticated."}, status=status.HTTP_401_UNAUTHORIZED)
        return view_func(request, *args, **kwargs)
    return _wrapped_view
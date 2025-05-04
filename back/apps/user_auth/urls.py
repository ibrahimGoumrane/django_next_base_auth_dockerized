from django.urls import path
from .views import user_login,user_registration , user_logout, check_auth , UserViewSet
from rest_framework.routers import DefaultRouter
from django.urls import include

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls)),  # Include the router URLs
    path("login/", user_login, name="user_login"),
    path("register/", user_registration, name="user_registration"),
    path("logout/", user_logout, name="user_logout"),
    path("check_auth/", check_auth, name="check_auth"),
]
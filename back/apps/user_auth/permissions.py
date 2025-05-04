from rest_framework.permissions import BasePermission


class BelongsToUser(BasePermission):
    """
    Custom permission to only allow users to access their own exams.
    """
    def has_permission(self, request, view):
        # Allow access if the user is authenticated
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access if the user is the user of the exam
        return obj.user == request.user
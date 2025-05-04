from rest_framework import serializers
from .models import User

# Get the custom user model (User)

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ['id', 'first_name' ,'last_name' , 'email' ,'password']
        extra_kwargs = {'password': {'write_only': True , "required": False}}
    def create(self, validated_data):
        """
        Create a new user instance.
        """
        user = User.objects.create_user(
            **validated_data
        )
        return user
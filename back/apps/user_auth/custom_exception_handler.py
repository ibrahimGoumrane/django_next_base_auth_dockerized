# your_app/exceptions.py
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        original_data = response.data
        message = None

        if isinstance(original_data, dict):
            # Merge all field errors or unknown keys
            merged = []
            for key, value in original_data.items():
                if isinstance(value, list):
                    merged.append(f"{key}: {' '.join(str(v) for v in value)}")
                else:
                    merged.append(f"{key}: {value}")
            message = ' | '.join(merged)
        else:
            # Fallback
            message = str(original_data)

        response.data = {
            "message": message
        }

    return response

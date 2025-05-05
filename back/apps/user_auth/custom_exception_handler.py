from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        original_data = response.data
        message = None

        if isinstance(original_data, dict):
            messages = []
            for key, value in original_data.items():
                if isinstance(value, list):
                    messages.append(f" {' '.join(str(v) for v in value)}")
                else:
                    messages.append(f" {value}")
            message = " | ".join(messages)
        else:
            message = str(original_data)

        response.data = {
            "error": message  # ✅ Ensures consistent "error" key
        }

    return response

class AllowPdfInIframeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # If PDF file requested and path starts with /exam_papers/
        if request.path.startswith("/exam_papers/") and request.path.endswith(".pdf"):
            response.headers.pop("X-Frame-Options", None)

        return response
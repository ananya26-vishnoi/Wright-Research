from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Wright_Research.settings')

application = get_wsgi_application()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('stocks.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Add static files serving only in development mode
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

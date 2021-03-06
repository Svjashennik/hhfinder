import django

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from hhfind import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hhapi.settings')
django.setup()
from channels.auth import AuthMiddlewareStack

django_asgi_app = get_asgi_application()
application = ProtocolTypeRouter({
                "http": django_asgi_app,

                    "websocket": AuthMiddlewareStack(
                                URLRouter(routing.websocket_urlpatterns)
                                    ),
                    })


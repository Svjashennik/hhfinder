from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import hhfind.routing
 
application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            hhfind.routing.websocket_urlpatterns
        )
    ),
})
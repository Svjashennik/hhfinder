import json
from channels.generic.websocket import JsonWebsocketConsumer
from rest_framework.permissions import IsAuthenticated
from asgiref.sync import async_to_sync

from django.core.mail import send_mail



class EventConsumer(JsonWebsocketConsumer):

    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
                'events',
                self.channel_name
                )
        self.accept()

    def disconnect(self, close_code):
        print("Closed websocket with code: ", close_code)
        async_to_sync(self.channel_layer.group_discard)(
              'events',
               self.channel_name
           )
        self.close()

    def receive_json(self, content, **kwargs):
        print("Received event: {}".format(content))
        self.send_json(content)

    def events_alarm(self, event):
        send_mail('робит', 'hj,bn', 'finder00@internet.ru', ['nek1212121@gmail.com'])
        self.send_json(
                            {
                                'type': 'events.alarm',
                                'content': event['content']
                            }
                )

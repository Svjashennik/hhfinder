nd = '/home/admin/web/proj/env/bin/gunicorn'
pythonpath = '/home/admin/web/proj/hhfinder'
bind = 'localhost:8001'
workers = 3
user = 'admin'
limit_request_fields = 32000
limit_request_field_size = 0
raw_env = 'DJANGO_SETTINGS_MODULE=hhapi.settings'

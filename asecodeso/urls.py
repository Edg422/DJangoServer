from django.conf.urls import url
from django.conf.urls.static import static

from . import views

app_name = 'asecodeso'

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
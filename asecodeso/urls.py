from django.conf.urls import url
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from django.conf.urls.static import static

from . import views

app_name = 'asecodeso'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^nosotros/$', views.nosotros, name='nosotros'),
    url(r'^preguntas/$', views.preguntas, name='preguntas'),
    url(r'^contacto/$', views.contacto, name='contacto'),
    url(r'^contitucion/$', views.constitucion, name='constitucion'),
]
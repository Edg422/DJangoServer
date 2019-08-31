from django.conf.urls import url

from . import views

app_name = 'goblin'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^soporte/$', views.soporte, name='soporte'),
    url(r'^proyectos/$', views.proyectos, name='proyectos'),
    url(r'^contacto/$', views.contacto, name='contacto'),
]
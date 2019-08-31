from django.conf.urls import url

from . import views

app_name = 'prisma'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^header/$', views.header, name='header'),
    url(r'^cursos/$', views.cursos, name='cursos'),
    url(r'^soporte/$', views.soporte, name='soporte'),
    url(r'^expertos/$', views.expertos, name='expertos'),
    url(r'^afop/$', views.afop, name='afop'),
    url(r'^fpf/$', views.fpf, name='fpf'),
    url(r'^cv/$', views.cv, name='cv'),
    url(r'^contacto/$', views.contacto, name='contacto'),
    url(r'^blog/$', views.blog, name='blog'),
]

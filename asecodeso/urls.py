from django.conf.urls import url
from django.conf.urls.static import static

from . import views

app_name = 'asecodeso'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^favicon.ico$',
        RedirectView.as_view(
            url=staticfiles_storage.url('favicon.ico'),
            permanent=False),
        name="favicon"
    ),
]
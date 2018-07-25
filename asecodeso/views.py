from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'asecodeso/index.html')

def nosotros(request):
    return render(request, 'asecodeso/nosotros.html')
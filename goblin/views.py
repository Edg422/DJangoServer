from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	return render(request, 'goblin/index.html')

def soporte(request):
    return render(request, 'goblin/soporte.html')

def proyectos(request):
    return render(request, 'goblin/proyectos.html')

def contacto(request):
    return render(request, 'goblin/contacto.html')
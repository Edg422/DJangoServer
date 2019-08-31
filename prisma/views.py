from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'prisma/index.html')

def header(request):
    return render(request, 'prisma/header.html')

def cursos(request):
    return render(request, 'prisma/cursos.html')

def soporte(request):
    return render(request, 'prisma/soporte.html')

def expertos(request):
    return render(request, 'prisma/expertos.html')

def afop(request):
    return render(request, 'prisma/afop.html')

def fpf(request):
    return render(request, 'prisma/fpf.html')

def cv(request):
    return render(request, 'prisma/cv.html')

def contacto(request):
    return render(request, 'prisma/contacto.html')

def footer(request):
    return render(request, 'prisma/footer.html')

def blog(request):
    return render(request, 'prisma/blog.html')


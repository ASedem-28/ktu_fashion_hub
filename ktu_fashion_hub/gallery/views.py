from django.shortcuts import render
from .models import FashionItem

# Create your views here.

def home_page(request):
    featured_designers = FashionItem.objects.order_by('-created_at')[:6]
    gallery_preview = FashionItem.objects.order_by('?')[:4]
    
    context = {
        'featured_designers': featured_designers,
        'gallery_preview': gallery_preview,
    }
    return render(request, 'index.html', context)


# Gallery page views
def gallery_page(request):
    fashion_items = FashionItem.objects.order_by('-created_at').all()
    context = {
        'fashion_items': fashion_items,
    }
    return render(request, 'gallery.html', context)


# View for rendering static pages for about and contact pages
def about_page(request):
    return render(request, 'about.html')

def contact_page(request):
    return render(request, 'contact.html')
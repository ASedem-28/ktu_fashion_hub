from django.shortcuts import render
from .models import FashionItem
from django.http import JsonResponse # Import JsonResponse
from django.db.models import Q, Value # Import Q for complex queries
import random

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
    # Check if a search query 'q' is in the URL parameters
    search_query = request.GET.get('q', None)
    if search_query:
        # If there's a search query, filter the items
        fashion_items = FashionItem.objects.filter(
            Q(title__icontains=search_query) | Q(designer_name__icontains=search_query)
        ).order_by('-created_at')
    else:
        # Otherwise, get all items
        fashion_items = FashionItem.objects.order_by('-created_at').all()
        
    context = {
        'fashion_items': fashion_items,
        'search_query': search_query or '', # Pass the query back to the template
    }
    return render(request, 'gallery.html', context)


def search_suggestions(request):
    # Provides real-time search suggestions for titles and designers.
    query = request.GET.get('term', '')

    if len(query) < 2:
        return JsonResponse([], safe=False)
    
    search_filter = Q(title__icontains=query) | Q(designer_name__icontains=query)

    # Fetch matching items from the database
    matched_items = FashionItem.objects.filter(search_filter)

    # --- GATHER AND DE-DUPLICATE SUGGESTIONS ---
    suggestions = set()

    for item in matched_items:
        if query.lower() in item.title.lower():
            suggestions.add(item.title)
        
        if query.lower() in item.designer_name.lower():
            suggestions.add(item.designer_name)
    
    final_suggestions = list(suggestions)[:10]
    
    return JsonResponse(final_suggestions, safe=False)


def initial_search_recommendations(request):
    # Provides an initial list of recommended search terms to show when a user clicks on the search bar.
    # Get a list of all unique titles and designer names
    all_titles = list(FashionItem.objects.values_list('title', flat=True).distinct())
    all_designers = list(FashionItem.objects.values_list('designer_name', flat=True).distinct())
    
    # Combine them into a single list of potential recommendations
    all_terms = list(set(all_titles + all_designers))
    
    # If we have more than 10 terms, pick 10 at random. Otherwise, use all of them.
    if len(all_terms) > 10:
        recommendations = random.sample(all_terms, 10)
    else:
        recommendations = all_terms
        
    return JsonResponse(recommendations, safe=False)


# View for rendering static pages for about and contact pages
def about_page(request):
    return render(request, 'about.html')

def contact_page(request):
    return render(request, 'contact.html')

def thank_you_page(request):
    return render(request, 'thank_you.html')

def privacy_policy_page(request):
    return render(request, 'privacy_policy.html')

def terms_of_use_page(request):
    return render(request, 'terms_of_use.html')
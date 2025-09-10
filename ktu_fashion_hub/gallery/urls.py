from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_page, name='home'),
    path('gallery/', views.gallery_page, name='gallery'),
    path('about/', views.about_page, name='about'),
    path('contact/', views.contact_page, name='contact'),
    path('search-suggestions/', views.search_suggestions, name='search_suggestions'),
    path('initial-search-recommendations/', views.initial_search_recommendations, name='initial_search_recommendations'),
]
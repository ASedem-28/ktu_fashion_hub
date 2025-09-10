from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_page, name='home'),
    path('gallery/', views.gallery_page, name='gallery'),
    path('about/', views.about_page, name='about'),
    path('contact/', views.contact_page, name='contact'),
    path('thank-you/', views.thank_you_page, name='thank_you'),
    path('search-suggestions/', views.search_suggestions, name='search_suggestions'),
    path('initial-search-recommendations/', views.initial_search_recommendations, name='initial_search_recommendations'),
    path('privacy-policy/', views.privacy_policy_page, name='privacy_policy'),
    path('terms-of-use/', views.terms_of_use_page, name='terms_of_use'),
]
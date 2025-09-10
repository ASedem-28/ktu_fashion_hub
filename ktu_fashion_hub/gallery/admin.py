from django.contrib import admin
from .models import FashionItem

@admin.register(FashionItem)
class FashionItemAdmin(admin.ModelAdmin): 
    list_display = ('title', 'designer_name', 'category', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'designer_name', 'designer_contact')
    
    fieldsets = (
        (None, {
            'fields': ('title', 'media_file', 'category')
        }),
        ('Designer Information', {
            'fields': ('designer_name', 'designer_contact')
        }),
    )
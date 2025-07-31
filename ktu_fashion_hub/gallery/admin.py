from django.contrib import admin
from .models import FashionItem

# Register your models here.

@admin.register(FashionItem)
class FashionItemAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('title', 'designer_name', 'designer_contact', 'category', 'created_at')
    
    # Filters that appear on the right side
    list_filter = ('category', 'created_at')
    
    # Fields to search by
    search_fields = ('title', 'designer_name', 'designer_contact')
    
    # Automatically prepopulate some fields if needed (optional)
    # prepopulated_fields = {'slug': ('title',)} 

    # Organize the detail view form
    fieldsets = (
        (None, {
            'fields': ('title', 'image', 'category')
        }),
        ('Designer Information', {
            'fields': ('designer_name', 'designer_contact')
        }),
    )
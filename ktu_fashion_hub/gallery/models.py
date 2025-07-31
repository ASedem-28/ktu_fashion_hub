from django.db import models

# Create your models here.

class FashionItem(models.Model):
    # Choices for the category filter, matching your frontend buttons
    CATEGORY_CHOICES = [
        ('men', "Men's Fashion"),
        ('women', "Women's Fashion"),
        ('patterns', 'Patterns & Textiles'),
        ('avant-garde', 'Avant-Garde'),
    ]

    title = models.CharField(max_length=200)
    designer_name = models.CharField(max_length=100)
    designer_contact = models.CharField(
        max_length=255, 
        blank=True, 
        help_text="Optional: Email, social media handle, or website."
    )
    # The 'upload_to' argument specifies a subdirectory within MEDIA_ROOT
    image = models.ImageField(upload_to='fashion_gallery/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='women')
    
    # Performance tip: Adding an index to a frequently filtered field can speed up queries.
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return f"{self.title} by {self.designer_name}"
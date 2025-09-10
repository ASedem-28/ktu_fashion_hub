import os
from django.db import models

class FashionItem(models.Model):
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

    media_file = models.FileField(
        upload_to='fashion_gallery/',
        help_text="Upload an image (jpg, png, etc.) or a video (mp4, mov, etc.)"
    )
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='women')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    @property
    def is_video(self):
        video_extensions = ['.mp4', '.mov', '.avi', '.wmv', '.mkv']
        file_extension = os.path.splitext(self.media_file.name)[1].lower()
        return file_extension in video_extensions

    
    @property
    def is_image(self):
        return not self.is_video

    def __str__(self):
        return f"{self.title} by {self.designer_name}"
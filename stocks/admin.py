# stockdata/admin.py

from django.contrib import admin
from .models import Stock

# Register your models here, if any
@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    pass
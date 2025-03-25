# fizzflow_backend/orders/api_urls.py

from django.urls import path
from . import views

urlpatterns = [
    # # Item API Endpoints
    # path('items/', views.get_items, name='get_items'),
    # path('items/by-category/<str:category>/', views.get_items_by_category, name='get_items_by_category'),
    # path('items/<str:item_id>/', views.get_item_detail, name='get_item_detail'),
    # path('items/save/', views.save_item, name='save_item'),
    # path('items/update/<str:item_id>/', views.update_item, name='update_item'),
    # path('items/delete/<str:item_id>/', views.delete_item, name='delete_item'),

    # # Order API Endpoints
    # path('orders/', views.get_orders, name='get_orders'),
    # path('orders/save/', views.save_order, name='save_order'),
    # path('orders/<str:order_id>/', views.get_order, name='get_order'),
    # path('orders/update/<str:order_id>/', views.update_order, name='update_order'),
    # path('orders/delete/<str:order_id>/', views.delete_order, name='delete_order'),
    
    # # Categories API Endpoint
    # path('categories/', views.get_categories, name='get_categories'),
]
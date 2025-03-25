from django.contrib import admin
from django.urls import path
from orders import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Item API Endpoints
    path('api/items/', views.get_items, name='get_items'),
    path('api/items/save/', views.save_item, name='save_item'),
    path('api/items/update/<str:item_id>/', views.update_item, name='update_item'),
    path('api/items/delete/<str:item_id>/', views.delete_item, name='delete_item'),
    path('api/items/<str:item_id>/', views.get_item_detail, name='get_item_detail'),
    path('api/items/by-category/<str:category>/', views.get_items_by_category, name='get_items_by_category'),
    
    # Categories API Endpoint
    path('api/categories/', views.get_categories, name='get_categories'),

    # Order API Endpoints
    path('api/orders/', views.get_orders, name='get_orders'),
    path('api/orders/save/', views.save_order, name='save_order'),
    path('api/orders/<str:order_id>/', views.get_order, name='get_order'),
    path('api/orders/update/<str:order_id>/', views.update_order, name='update_order'),
    path('api/orders/delete/<str:order_id>/', views.delete_order, name='delete_order'),
]

# Add static file serving during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
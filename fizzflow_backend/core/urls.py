from django.contrib import admin
from django.urls import path
from orders import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Item Endpoints
    path('api/items/', views.get_items, name='get_items'),
    path('api/items/save/', views.save_item, name='save_item'),
    path('api/items/update/<str:item_id>/', views.update_item, name='update_item'),
    path('api/items/delete/<str:item_id>/', views.delete_item, name='delete_item'),

    # Order Endpoints
    path('api/orders/', views.get_orders, name='get_orders'),
    path('api/orders/save/', views.save_order, name='save_order'),
    path('api/orders/<str:order_id>/', views.get_order, name='get_order'),
    path('api/orders/update/<str:order_id>/', views.update_order, name='update_order'),
    path('api/orders/delete/<str:order_id>/', views.delete_order, name='delete_order'),

    # Home Endpoint
    # path('', views.home, name='home'),
    
    path('admin/', admin.site.urls),
    path('', views.home_page, name='home'),
    path('categories/', views.categories_page, name='categories'),
    path('checkout/', views.checkout_page, name='checkout'),
]

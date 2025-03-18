from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets 
from .firebase_item_helper import (
    save_item_to_firestore,
    get_all_items_from_firestore,
    update_item_in_firestore,
    delete_item_from_firestore
)
from .firebase_order_helper import (
    is_valid_item_id,
    save_order_to_firestore,
    get_all_orders_from_firestore,
    get_order_by_id,
    update_order_in_firestore,
    # delete_order_from_firebase
    delete_order_from_firestore
)

from django.shortcuts import render

# ✅ Validate if request body exists and is a dictionary
def validate_request_body(request):
    if not request.data or not isinstance(request.data, dict):
        return Response({"error": "Request body is required and should be a JSON object"}, status=400)
    return None  # No errors


### 📌 ITEM CRUD OPERATIONS
@api_view(['POST'])
def save_item(request):
    validation_error = validate_request_body(request)
    if validation_error:
        return validation_error

    item_data = request.data

    if "name" not in item_data or "price" not in item_data or "category" not in item_data:
        return Response({"error": "Missing required fields: name, price, category"}, status=400)

    # if not isinstance(item_data["price"], (int, float)):
    #     return Response({"error": "Price must be a number"}, status=400)

    item_id = save_item_to_firestore(item_data)
    if item_id:
        return Response({"message": "Item saved successfully", "item_id": item_id}, status=201)
    else:
        return Response({"error": "Failed to save item"}, status=500)

@api_view(['GET'])
def get_items(request):
    items = get_all_items_from_firestore()
    return Response(items, status=200)

@api_view(['PUT'])
def update_item(request, item_id):
    validation_error = validate_request_body(request)
    if validation_error:
        return validation_error

    updated_data = request.data
    success = update_item_in_firestore(item_id, updated_data)
    if success:
        return Response({"message": "Item updated successfully"}, status=200)
    else:
        return Response({"error": "Failed to update item"}, status=500)

@api_view(['DELETE'])
def delete_item(request, item_id):
    success = delete_item_from_firestore(item_id)
    if success:
        return Response({"message": "Item deleted successfully"}, status=200)
    else:
        return Response({"error": "Failed to delete item"}, status=500)


### 📌 ORDER CRUD OPERATIONS

@api_view(['POST'])
def save_order(request):
    validation_error = validate_request_body(request)
    if validation_error:
        return validation_error

    order_data = request.data

    if "items" not in order_data or not isinstance(order_data["items"], list) or len(order_data["items"]) == 0:
        return Response({"error": "Order must contain at least one item"}, status=400)

    for item in order_data["items"]:
        if "item_id" not in item or not is_valid_item_id(item["item_id"]):
            return Response({"error": f"Invalid item ID: {item.get('item_id', 'N/A')}"}, status=400)
        if "quantity" not in item or not isinstance(item["quantity"], int) or item["quantity"] <= 0:
            return Response({"error": f"Invalid quantity for item {item['item_id']}"}, status=400)

    if "total_price" not in order_data or not isinstance(order_data["total_price"], (int, float)):
        return Response({"error": "Total price is required and must be a number"}, status=400)

    order_id = save_order_to_firestore(order_data)
    if order_id:
        return Response({"message": "Order saved successfully", "order_id": order_id}, status=201)
    else:
        return Response({"error": "Failed to save order"}, status=500)

@api_view(['GET'])
def get_orders(request):
    orders = get_all_orders_from_firestore()
    return Response(orders, status=200)

@api_view(['GET'])
def get_order(request, order_id):
    order = get_order_by_id(order_id)
    if order:
        return Response(order, status=200)
    else:
        return Response({"error": "Order not found"}, status=404)

@api_view(['PUT'])
def update_order(request, order_id):
    validation_error = validate_request_body(request)
    if validation_error:
        return validation_error

    updated_data = request.data
    success = update_order_in_firestore(order_id, updated_data)
    if success:
        return Response({"message": "Order updated successfully"}, status=200)
    else:
        return Response({"error": "Failed to update order"}, status=500)

@api_view(['DELETE'])
def delete_order(request, order_id):
    success = delete_order_from_firebase(order_id)
    if success:
        return Response({"message": "Order deleted successfully"}, status=200)
    else:
        return Response({"error": "Failed to delete order"}, status=500)


### 📌 FRONTEND PAGES
def home_page(request):
    return render(request, 'home.html')

def categories_page(request):
    return render(request, 'categories.html')

def checkout_page(request):
    return render(request, 'checkout.html')

def personalization_page(request):
    return render(request, 'personalization.html')

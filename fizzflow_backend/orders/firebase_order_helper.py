import firebase_admin
from firebase_admin import db
from google.cloud import firestore


# Initialize Firestore Client with Service Account Key
db = firestore.Client.from_service_account_json("serviceAccountKey.json")


def is_valid_item_id(item_id):
    try:
        item_ref = db.collection('items').document(item_id).get()
        return item_ref.exists 
    except Exception as e:
        print("Error validating item ID:", e)
        return False

def save_order_to_firestore(order_data):
    try:
        orders_ref = db.collection('orders')
        new_order_ref = orders_ref.add(order_data)
        return new_order_ref[1].id 
    except Exception as e:
        print("Error saving order:", e)
        return None

def get_all_orders_from_firestore():
    try:
        orders_ref = db.collection('orders').stream()
        orders = {order.id: order.to_dict() for order in orders_ref}
        return orders
    except Exception as e:
        print("Error retrieving orders:", e)
        return {}

def get_order_by_id(order_id):
    try:
        order_ref = db.collection('orders').document(order_id).get()
        if order_ref.exists:
            return order_ref.to_dict()
        else:
            return None
    except Exception as e:
        print("Error retrieving order:", e)
        return None

def update_order_in_firestore(order_id, updated_data):
    try:
        order_ref = db.collection('orders').document(order_id)
        order_ref.update(updated_data)
        return True
    except Exception as e:
        print("Error updating order:", e)
        return False

def delete_order_from_firestore(order_id):
    try:
        order_ref = db.collection('orders').document(order_id)
        order_ref.delete()
        return True
    except Exception as e:
        print("Error deleting order:", e)
        return False
import firebase_admin
from firebase_admin import db
from google.cloud import firestore

db = firestore.Client.from_service_account_json("serviceAccountKey.json")

def save_item_to_firestore(item_data):
    try:
        items_ref = db.collection('items')
        new_item_ref = items_ref.add(item_data)
        return new_item_ref[1].id 
    except Exception as e:
        print("Error saving item:", e)
        return None

def get_all_items_from_firestore():
    try:
        items_ref = db.collection('items').stream()
        items = {item.id: item.to_dict() for item in items_ref}
        return items
    except Exception as e:
        print("Error retrieving items:", e)
        return {}

def update_item_in_firestore(item_id, updated_data):
    try:
        item_ref = db.collection('items').document(item_id)
        item_ref.update(updated_data)
        return True
    except Exception as e:
        print("Error updating item:", e)
        return False

def delete_item_from_firestore(item_id):
    try:
        item_ref = db.collection('items').document(item_id)
        item_ref.delete()
        return True
    except Exception as e:
        print("Error deleting item:", e)
        return False

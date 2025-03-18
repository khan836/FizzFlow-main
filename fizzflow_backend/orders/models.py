from django.db import models

class Item(models.Model):
    name = models.CharField(max_length = 255)
    price = models.DecimalField(max_digits = 10, decimal_places = 2)
    category = models.CharField(max_length = 100)

class Order(models.Model):
    item = models.ForeignKey(Item, on_delete = models.CASCADE)
    quantity = models.IntegerField
    total_price = models.DecimalField(max_digits = 10, decimal_places = 2)
    created_at = models.DateTimeField(auto_now_add = True)

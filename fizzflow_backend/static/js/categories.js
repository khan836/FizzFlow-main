// Fetch existing items from the backend
fetch("/api/items/")
    .then(response => response.json())
    .then(data => {
        const itemsList = document.getElementById("items-list");
        itemsList.innerHTML = "";

        const items = Array.isArray(data) ? data : Object.entries(data).map(([id, item]) => ({ id, ...item }));

        if (items.length === 0) {
            itemsList.innerHTML = "<p>No items available.</p>";
            return;
        }

        items.forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");

            const itemName = document.createElement("h1");
            itemName.textContent = item.name;

            const itemPrice = document.createElement("p");
            itemPrice.textContent = "Price: £" + item.price;

            const addButton = document.createElement("button");
            addButton.textContent = "Add to Cart";
            addButton.onclick = () => addToCart(item);

            itemCard.appendChild(itemName);
            itemCard.appendChild(itemPrice);
            itemCard.appendChild(addButton);
            itemsList.appendChild(itemCard);
        });
    })
    .catch(error => console.error("Error fetching items:", error));

// Function to add item to the cart in localStorage
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.item_id === item.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            item_id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
}

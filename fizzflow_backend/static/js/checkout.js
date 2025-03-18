function placeOrder() {
    fetch("/api/orders/save/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem("cart")) || [],
            total_price: parseFloat(document.getElementById("total-price").textContent),
            created_at: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "/";
    })
    .catch(error => console.error("Error placing order:", error));
}

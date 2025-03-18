fetch("/api/items/")
    .then(response => response.json())
    .then(data => {
        const categoriesDiv = document.getElementById("categories");
        data.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = item.name + " - $" + item.price;
            categoriesDiv.appendChild(itemDiv);
        });
    })
    .catch(error => console.error("Error fetching items:", error));

document.addEventListener("DOMContentLoaded", () => {
    const orderList = document.getElementById("order-list");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        orderList.innerHTML = "<p>No orders yet.</p>";
    } else {
        orders.forEach((order, index) => {
            const orderItem = document.createElement("div");
            orderItem.className = "order-item";

            const orderHeader = document.createElement("h3");
            orderHeader.textContent = `Order #${index + 1}`;

            const itemsList = document.createElement("ul");
            order.items.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                itemsList.appendChild(listItem);
            });

            const orderTotal = document.createElement("p");
            orderTotal.textContent = `Total Cost: $${order.total.toFixed(2)}`;

            orderItem.appendChild(orderHeader);
            orderItem.appendChild(itemsList);
            orderItem.appendChild(orderTotal);

            orderList.appendChild(orderItem);
        });
    }
});

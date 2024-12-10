document.addEventListener("DOMContentLoaded", () => {
    const gameList = document.getElementById("game-list");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");
    const cart = [];

    // Fetch games from games.json
    async function fetchGames() {
        const response = await fetch("games.json");
        const games = await response.json();
        renderGames(games);
    }

    // Render games
    function renderGames(games) {
        games.forEach(game => {
            const gameItem = document.createElement("div");
            gameItem.className = "game-item";

            const gameImage = document.createElement("img");
            gameImage.src = game.image;
            gameImage.alt = game.name;

            const gameName = document.createElement("h3");
            gameName.textContent = game.name;

            const gamePrice = document.createElement("p");
            gamePrice.textContent = `$${game.price.toFixed(2)}`;

            const addButton = document.createElement("button");
            addButton.textContent = "Add to Cart";
            addButton.addEventListener("click", () => addToCart(game));

            gameItem.appendChild(gameImage);
            gameItem.appendChild(gameName);
            gameItem.appendChild(gamePrice);
            gameItem.appendChild(addButton);

            gameList.appendChild(gameItem);
        });
    }

    // Add game to cart
    function addToCart(game) {
        cart.push(game);
        updateCart();
    }

    // Update cart display
    function updateCart() {
        cartItems.innerHTML = cart.map(item => `<div>${item.name} - $${item.price.toFixed(2)}</div>`).join("");
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalPrice.textContent = total.toFixed(2);
        checkoutButton.disabled = cart.length === 0;
    }

    // Save order
    function saveOrder() {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        orders.push({ items: cart.map(item => item.name), total });
        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Order placed successfully!");
        cart.length = 0;
        updateCart();
    }

    // Checkout event
    checkoutButton.addEventListener("click", saveOrder);

    // Fetch games on load
    fetchGames();
});

// Smooth Scroll Navigation
document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function(e) {

        const targetId = this.getAttribute("href");

        if(targetId.startsWith("#")){

            e.preventDefault();

            const target =
            document.querySelector(targetId);

            if(target){

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});

// Explore Collection Button
const exploreBtn =
document.querySelector(".btn");

if(exploreBtn){

    exploreBtn.addEventListener("click", () => {

        const collections =
        document.getElementById("collections");

        if(collections){

            collections.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}

// Back To Top Button
const topBtn =
document.getElementById("topBtn");

if(topBtn){

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// Wishlist
let wishlistCount = 0;

document.querySelectorAll(".wish-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const card =
        button.closest(".card");

        const productName =
        card.querySelector("h3").textContent;

        const productImage =
        card.querySelector("img").src;

        let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

        wishlist.push({
            name: productName,
            image: productImage
        });

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        wishlistCount++;

        const wishCount =
        document.getElementById("wish-count");

        if(wishCount){

            wishCount.textContent =
            wishlistCount;

        }

        alert(
            productName + " added to Wishlist!"
        );

    });

});
// Quantity Buttons
document.querySelectorAll(".quantity-box")
.forEach(box => {

    const quantity =
    box.querySelector(".quantity");

    const plus =
    box.querySelector(".plus");

    const minus =
    box.querySelector(".minus");

    if(plus){

        plus.addEventListener("click", () => {

            quantity.textContent =
            Number(quantity.textContent) + 1;

        });

    }

    if(minus){

        minus.addEventListener("click", () => {

            if(Number(quantity.textContent) > 1){

                quantity.textContent =
                Number(quantity.textContent) - 1;

            }

        });

    }

});

// Search
const search =
document.getElementById("search");

if(search){

    search.addEventListener("keyup", () => {

        const value =
        search.value.toLowerCase();

        document
        .querySelectorAll(".card")
        .forEach(card => {

            const title =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

            card.style.display =
            title.includes(value)
            ? "block"
            : "none";

        });

    });

}

// Add To Cart
let cartCount = 0;

document.querySelectorAll(".cart-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const product =
        button.dataset.name;

        const price =
        Number(button.dataset.price);

        if(!product) return;

        let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        cart.push({
            name: product,
            price: price
        });

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        cartCount++;

        const cartCountElement =
        document.getElementById("cart-count");

        if(cartCountElement){

            cartCountElement.textContent =
            cartCount;

        }

        alert(product + " added to cart!");

    });

});

// Display Cart
const cartItems =
document.getElementById("cart-items");

if(cartItems){

    const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let total = 0;

    cart.forEach(product => {

        if(!product) return;

        const li =
        document.createElement("li");

        li.textContent =
        `${product.name} - ₹${product.price}`;

        cartItems.appendChild(li);

        total += Number(product.price);

    });

    const totalElement =
    document.getElementById("total");

    if(totalElement){

        totalElement.textContent =
        total;

    }

}

// Product Modal
const modal =
document.getElementById("productModal");

const closeBtn =
document.querySelector(".close");

document.querySelectorAll(".product-img")
.forEach(img => {

    img.addEventListener("click", () => {

        if(!modal) return;

        modal.style.display =
        "block";

        document.getElementById(
            "modal-img"
        ).src = img.src;

        document.getElementById(
            "modal-title"
        ).textContent = img.alt;

        document.getElementById(
            "modal-price"
        ).textContent =
        "Premium Collection";

        document.getElementById(
            "modal-desc"
        ).textContent =
        "Elegant ethnic wear for every occasion.";

    });

});

if(closeBtn && modal){

    closeBtn.addEventListener("click", () => {

        modal.style.display =
        "none";

    });
}


// Checkout
const checkoutBtn =
document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", () => {

        const customerName =
        document.getElementById("customer-name").value;

        const customerPhone =
        document.getElementById("customer-phone").value;

        if(!customerName || !customerPhone){

            alert(
                "Please enter your Name and Phone Number"
            );

            return;

        }

        const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        if(cart.length === 0){

            alert("Your cart is empty!");

            return;

        }

        let total = 0;

        let orderText =
`🛍️ *NEW ORDER RECEIVED - ZARIYA BOUTIQUE*

━━━━━━━━━━━━━━━

👤 Customer Name:
${customerName}

📞 Phone Number:
${customerPhone}

📦 Ordered Products:

`;

        cart.forEach(item => {

            orderText +=
            `• ${item.name} - ₹${item.price}\n`;

            total += Number(item.price);

        });

        orderText +=

`\n━━━━━━━━━━━━━━━

💰 Order Total: ₹${total}

📅 Date:
${new Date().toLocaleDateString()}

⏰ Time:
${new Date().toLocaleTimeString()}

━━━━━━━━━━━━━━━

Thank you for shopping with Zariya ❤️`;

        alert("✅ Order Confirmed!");

        const whatsappNumber =
        "917382353167";

        const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;

        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


// Wishlist Display
const wishlistItems =
document.getElementById("wishlist-items");

if(wishlistItems){

    let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

    wishlist.forEach((product,index) => {

        const div =
        document.createElement("div");

        div.classList.add("wishlist-card");

        div.innerHTML = `
            <img src="${product.image}">
            <h4>${product.name}</h4>
            <button onclick="removeWishlist(${index})">
                ❌ Remove
            </button>
        `;

        wishlistItems.appendChild(div);

    });

}


// Remove Wishlist Item
function removeWishlist(index){

    let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

    wishlist.splice(index,1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    location.reload();

}
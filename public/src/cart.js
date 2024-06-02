let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

// console.log(shopItemsData)
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        console.log("basket is not empty");
        // console.log(basket);
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return `
                <div class="cart-item">
                    <img width="150" src=${search.img} alt="" />
                    <div class="details">
                    <div class="title-price-x">
                        <p class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">Rs. ${search.price}</p>
                        </p>
                        <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                    </div>

                    <p>Rs. ${item * search.price}</p>
                    </div>
                </div>
                `;
            })
            .join(""));
    } else {
        console.log("basket is empty");
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
    <p style="font-size:24px">Cart is Empty</p>
    <a href="home.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
            .map((x) => {
                let { item, id } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];

                return item * search.price;
            })
            .reduce((x, y) => x + y, 0);
        // console.log(amount);
        label.innerHTML = `
    <p style="font-size:24px">Total Amount : Rs.${amount}</p>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
    } else return;
};

TotalAmount();

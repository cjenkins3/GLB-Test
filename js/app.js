 // Ping your heroku, netlify or other projects
 pingAll = (urls) => {
    if(!urls || urls.length == 0)
        return;

    // urls.forEach(url=>http.get(url).on('error', err=> console.error(err)));
    // OR
    axios.all([
        urls.map(url=>axios.get(url))
    ])
    .catch(console.error)
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener("click", removeCartItem) 
        }
        var quantityInputs = document.getElementsByClassName("cart-quantity-input")
        for (var i = 0; i < quantityInputs.length; i++ ) {
            var input = quantityInputs[i]
            input.addEventListener("change", quantityChanged)
        }

    var addToCartButtons = document.getElementsByClassName("card-button")
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClicked)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target 
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("card-title")[0].innerText
    var price = shopItem.getElementsByClassName("card-item-price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("card-img-top")[0].src
    console.log(title, price, imageSrc)
    addItemtoCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemtoCart(title, price, imageSrc) {
    var cartRow = document.createElement("div")
    cartRow.classList.add("cart-items")
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("card-title")
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
        alert("This item is already added to the cart")
        return
        }
    }
    
    var cartRowContents = `

    <div class="cart-row">
    <div class="cart-items">
    <ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <img class="cart-item-image" src="${imageSrc}" type="image" name="item" width= "100" height= "100">
          <h6 class="my-0" type="text" name="item">${title}</h6>
          <br>
          
            <input class="cart-quantity-input" name="quantity" type="number" value="1">
            <hr>
            <button class="btn btn-danger" type="button">REMOVE</button>
          
      </div>
        <div class="item-price">${price}</div>`
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName("item-price")[0]
            var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")
            [0]
            var price = parseFloat(priceElement.innerText.replace("$", ""))
            var quantity = quantityElement.value
            console.log(price * quantity);
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total + " "
}

}


// //Order

const order = document.getElementById('orderBtn');

const list = document.getElementsByClassName("payment__product-list")
var cart = []
var user = {}
for (i = 0; i < list.length; i++) {
    cart.push({
        id: list[i].getElementsByClassName("product_id")[0].getAttribute("data-product-id"),
        qty: parseInt(list[i].getElementsByClassName("qty")[0].innerText.replace("x ", "")),
    })
}

var priceElement = document.getElementsByClassName("cost")[0];
var price = parseFloat(priceElement.innerText.replace('$', ''));

function setUser() {
    user = {
        fullname: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        address: {
            detail: $("#address-detail-field").val(),
            city: $("#address-city-field").val(),
            state: $("#address-state-field").val(),
            country: $("#address-country-field").val()
        }
    }
}

async function sendData(type, cart, token, user) {
    console.log(user);
    let res = await axios.post("/client/api/payment/", {
        type: type,
        cart: cart,
        token: token,
        user: user
    })
    sessionStorage.setItem("message", res.data.message)
    await axios.delete("client/api/payment/")
    window.location = "/"
}


paypal.Buttons({
    createOrder: async function () {
        setUser()
        return await axios.post("/client/api/paypal", {
            value: price
        }).then((res) => {
            return res.data.orderID
        }).catch((e) => { console.log(e) })
    },
    onApprove: async function(data, actions) {
        await sendData("paypal", cart, data.orderID, user)
        return actions.order.capture().then(function(details) {
        //   alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
}).render('#paypal-button-container');



order.addEventListener('click', async () => {
    setUser();
    await sendData("direct", cart, "0", user)
});





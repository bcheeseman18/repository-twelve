// function onSelect() {
//     console.log("selected")
//     let dropdown = document.querySelector('.orderSelect');
//     console.log("index = " + dropdown.selectedIndex);
// }

function validateCreditCard(ccnumber) {
    let result = ccnumber.search( /^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/ );
    return result != -1;
}

function validateEmail(email) {
    let result = email.search( /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return result != -1;
}

function displayOrderItems(order) {
    let totalSum = 0.0;
    for(let i = 0; i < order.items.length; i++) {
        totalSum += order.items[i].price
    }

    order.totalprice = totalSum
    
    let parent = document.querySelector('.orderItems'); 
    let template = document.querySelector('#order-template').innerHTML;
    parent.innerHTML = Mustache.render(template, order); 
    
    let orderItem = document.createElement('li'); 
    parent.appendChild(orderItem); 

}

function listOrders(response) {
    for(let i = 0; i < response.length; i++) {
        response[i]["selected"] = function() {
            console.log("selected")
        };
    }
    let orders = {orders: response}
    let template = document.querySelector('#checkout-template').innerHTML;
    
    let parent = document.querySelector('.orderSelect');
    parent.innerHTML = Mustache.render(template, orders)
    parent.onchange = function() {
        let order = response[this.selectedIndex];
        displayOrderItems(order);
    }
}

function loadOrders() {

    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/order');
    request.addEventListener('load', function () {

        // response is the container for the info we get back from JSON
        let response = JSON.parse(request.responseText);
        console.log(response);
        listOrders(response);
    });
    request.send();
}


function loadValidators() {
    let cctext = document.querySelector('.creditcard');
    let ccerrmsg = document.querySelector(".ccerrmsg");
    cctext.addEventListener('blur', function() { // 
        let valid = validateCreditCard(this.value);
        if (valid) {
            // hide error message
            ccerrmsg.style.display = "none";
        } else {
            // show error message
            ccerrmsg.style.display = "inline";
        }
    })
}

window.addEventListener('load', function () {
    loadOrders();
    loadValidators();
    validateCreditCard(); 
    validateEmail(); 
});
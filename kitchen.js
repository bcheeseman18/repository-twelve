/**
 * Today we'll revise yesterday's code to use templates and also build a first iteration of the kitchen view. 
 * You'll be using some of the same API endpoints as the kitchen view and sharing data across multiple pages.

For tonight's assignment you should write a second HTML file includes a second JS file. 
If you have any shared code, you can put it in a third file and include it in both. 
We'll get to another (better) approach to using multiple Javascript files soon.

The kitchen view allows users to make certain modifications to food items and modify the status of orders; 
each page should have a link to the inactive page.
 */

/**
 *--------------------------------------------- List all foods --------------------------------------------------

You should list all available menu items (GET /menu) 
and allow users to click a button to make a food available or unavailable (POST /menu/<menu_id>). 
Unlike the menu view, unavailable items should still be listed here.
 */

function setAvailability(item, availtext) { //pass these parameters because function is out of scope
    if (item.available) {
        availtext.textContent = "Available";
    } else {
        availtext.textContent = "Not Available";
    }
}

//Function to create the menu 
function available() {
    let items = new XMLHttpRequest();
    items.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    items.addEventListener('load', function () {

        let response = JSON.parse(items.responseText);
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            makeMenu(response[i]);

        }
        console.log(response);
    });

    items.send();
}

function makeMenu(item) {
    let template = document.querySelector('#kitchen-template').innerHTML;

    let parent = document.querySelector('.menu');

    let menuItem = document.createElement('li');
    menuItem.classList.add('item');
    menuItem.innerHTML = Mustache.render(template, item); 

    let availBtn = menuItem.querySelector('.availBtn'); 
        availBtn.addEventListener('click', function () {
        console.log('Item ordered');

    let availtext = menuItem.querySelector('label'); 
        item.available = !item.available
        setAvailability(item, availtext); //pass these parameters because function is out of scope

        let request = new XMLHttpRequest();
        let url = 'https://tiy-28202.herokuapp.com/menu/' + item.id;
        request.open('POST', url);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send()
    })
    // let food = document.createElement('p');
    // food.textContent = item.name;

    // let description = document.createElement('p');
    // description.textContent = item.description;

    // let price = document.createElement('p');
    // price.textContent = item.price;

    // let availability = document.createElement('p');
    // let availtext = document.createElement('label');
    // availability.appendChild(availtext);

    // setAvailability(item, availtext);

    // menuItem.appendChild(food);
    // menuItem.appendChild(description);
    // menuItem.appendChild(price);
    // menuItem.appendChild(availability);

    parent.appendChild(menuItem);

    console.log('show item');

    //--------------------------requests availability of item ------------------------
    // let availBtn = document.createElement('button')
    // availBtn.textContent = 'Change availability'
    // availability.appendChild(availBtn);

    // availBtn.addEventListener('click', function () {
    //     console.log('Item ordered');

    //     item.available = !item.available
    //     setAvailability(item, availtext); //pass these parameters because function is out of scope

    //     let request = new XMLHttpRequest();
    //     let url = 'https://tiy-28202.herokuapp.com/menu/' + item.id;
    //     request.open('POST', url);
    //     request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     request.send()
    // });
}

function loadMenu() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    request.addEventListener('load', function () {

        // response is the container for the info we get back from JSON
        let response = JSON.parse(request.responseText);
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            makeMenu(response[i]); //runs the makeMenu function for all info and displays what we want it to

        }
        console.log(response);
    });
    request.send();
}

function makeOrder(order, i) {

    let template = document.querySelector('#kitchen-template').innerHTML;

    let parent = document.querySelector('.order');

    let orderItem = document.createElement('li');
    orderItem.classList.add('order');
    orderItem.innerHTML = Mustache.render(template, order); 

    // let tableId = document.createElement('p');
    // tableId.textContent = order.table_id;
    // orderItem.appendChild(tableId);

    for (let i = 0; i < order.items.length; i++) {
        let name = document.querySelector('p');
        // name.textContent = order.items[i].name;
        // orderItem.appendChild(name);
    }

    if (order.in_progress) {
        let completeBtn = document.querySelector('.completeBtn')
        // completeBtn.textContent = 'Complete'
        // orderItem.appendChild(completeBtn);
        completeBtn.addEventListener('click', function () {
            console.log('Complete Order');

            let request = new XMLHttpRequest();
            let url = 'https://tiy-28202.herokuapp.com/order/' + i;
            request.open('POST', url);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send();
        });
    }
    parent.appendChild(orderItem);
}

function loadOrders() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/order');
    request.addEventListener('load', function () {

        // response is the container for the info we get back from JSON
        let response = JSON.parse(request.responseText);
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            makeOrder(response[i], i);
        }
    });
    request.send();
}

window.addEventListener('load', function () {

    //-------------------function gets menu from API and uses makeMenu to display-----------
    loadMenu();
    loadOrders();
});





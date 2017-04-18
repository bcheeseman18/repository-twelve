/*
We're going to be building a single application over the course of this week; it involves two frontend pages 
(a 'menu view' and a 'kitchen view') that are part of a restaurant ordering system. 
Today we'll be starting the menu view.
You should build an application that displays available menu items and allows people to click an 'order' button. 
Ordering will send a message to the kitchen that includes the table number and the item that they ordered, 
and will also get added to a receipt that's displayed to the user.
*/

console.log('test');

function makeMenu(item) {

    let parent = document.querySelector('ul');


    let menuItem = document.createElement('li');
    menuItem.classList.add('item');


    let food = document.createElement('p');
    food.textContent = item.name;


    let description = document.createElement('p');
    description.textContent = item.description;


    let price = document.createElement('p');
    price.textContent = item.price;


    menuItem.appendChild(food);
    menuItem.appendChild(description);
    menuItem.appendChild(price);

    parent.appendChild(menuItem);

    console.log('show item');

    let orderBtn = document.createElement('button');
    orderBtn.textContent = 'Add item'
    menuItem.appendChild(orderBtn);

    orderBtn.addEventListener('click', function () {
        console.log('Item added');


        let request = new XMLHttpRequest();
        request.open('POST', 'https://tiy-28202.herokuapp.com/order');
        request.addEventListener('load', function () {
            console.log('recieved'); //this is not necessary for POST

        function getBill() {
            let bill = new XMLHttpRequest(); 
            bill.open('GET', 'http://tiy-28202.herokuapp.com/bill?table_id=Ben'); 
            bill.addEventListener('load', function () {

                    let response = JSON.parse(bill.responseText); 
                    console.log(response); 
                    for (let i = 0; i < response.length; i++) {
                        makeMenu(response[i]); 
                    }
                    console.log(response); 
            }); 

            bill.send(); 
        }
    getBill(); 
});

        request.send(JSON.stringify({
            table_id: 'Ben',
            menu_id: item.id,

        }));

    });
}















    //-------------------------- AJAX ------------------------------------


    window.addEventListener('load', function () {

        function getMenu() { //function recieves the menu items from API
            let request = new XMLHttpRequest();
            request.open('GET', 'http://tiy-28202.herokuapp.com/menu');
            request.addEventListener('load', function () {


                let response = JSON.parse(request.responseText);
                console.log(response);
                for (let i = 0; i < response.length; i++) {
                    makeMenu(response[i]);
                }
                console.log(response);

            });

            request.send();


        }

        getMenu();


        /*
            let orderBtn = document.querySelector(#order);
            orderBtn.addEventListener('click', function (){
                console.log(); 
        
        
            }); 
        */
    }); //close of addEventListener


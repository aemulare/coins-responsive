$(document).ready(function(){

    // flip coin on 'click'
    $(".card-grid").flip({
        trigger: 'click',
        speed: 500
    });


    // format coin price with comma
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var theTotal = 0;
    var coinQuantity = 0;
    var idClicked, currentPrice, parentCard, coinName, parentCardId, btnIndex;
    var itemQuantities = new Array(1000).fill(0);
    var cart = [];


    function isInCart(coin) {
        return coin.id === parentCard.prop("id");
    }


    function saveToLocalStorage(cart) {
        var jsonStr = JSON.stringify(cart);                 // turn JSON object to string
        localStorage.setItem( "cart", jsonStr );            // store in local storage
    }


    function getFromLocalStorage() {
        var jsonStr = localStorage.getItem( "cart" );                       // get json string from local storage
        var parsed = JSON.parse(jsonStr);                                   // parse json string
        cart = Object.keys(parsed).map(function(k) { return parsed[k] });   // build an array with content from local storage
        return cart;
    }


    function cartTotal() {
        var total = 0;
        var cart = getFromLocalStorage();
        for (var i = 0; i < cart.length; i++) {
            var coin = cart[i];
            total += coin.Quantity * coin.Price;
        }
        return total;
    }

    // local storage test
    // if (typeof(Storage) !== "undefined") {
    //     alert("Local storage is set! Local storage length = " + localStorage.length);
    // }
    // else {
    //     alert("Sorry! No Web Storage support..");
    // }


    $('#clear-cart').click(function() {
        localStorage.clear();
    });


    $('#view').click(function() {
        var cartString = localStorage.getItem( "cart" ); // get cart JSON object from local storage
        alert("Cart string in local storage: " + cartString);

    });


    // on price button click
    $("a button").click(function(e){
        idClicked = this.id;
        coinPrice = this.value;

        btnIndex = Number(idClicked.substring(4));
        coinQuantity = itemQuantities[btnIndex];

        parentCard = $(this).parents().eq(2);
        // alert(parentCard.prop("tagName") + " class: " + parentCard.prop("className") + ", id = " + parentCard.prop("id"));

        parentCardId = "#" + parentCard.prop("id");

        coinName = $(parentCardId).find("span").eq(0).text();
        coinDescription = $(parentCardId).find("span").eq(1).text();
        coinImg = $(parentCardId).find("img").eq(0).attr("src");

        // create coin object
        var coin = {
            "id":parentCard.prop('id'),
            "Name":coinName,
            "Description":coinDescription,
            "Img":coinImg,
            "Price":coinPrice,
            "Quantity":1
        };



        // EMPTY CART
        if (localStorage.length === 0) {
            cart.push(coin);                        // add coin to cart
            saveToLocalStorage(cart);
        }

        // NOT EMPTY CART
        else {
            cart = getFromLocalStorage();
            var coinFound = cart.find(isInCart);

            if (coinFound === undefined) {
                cart.push(coin);                    // add coin to cart
                saveToLocalStorage(cart);
            }
            else {
                coinFound.Quantity += 1;            // update quantity
                saveToLocalStorage(cart);
            }
        }


        // pop-up confirmation message update
        $(".modal-header").html(
        '<h5>' +
            '<span class="coin-name">'+ coinName +'</span><br/>' +
            '<span class="coin-description">'+ coinDescription +'</span>' +
        '</h5>' +
        '<h5>$<span id="price">'+ numberWithCommas(coinPrice) +'</span></h5>');

        $(".modal-body").html('<img class="coin" src="'+ coinImg +'">');


        // var msg = "1 item has been added to your cart:\n\n\t" + coinName + "\n\t" + coinDescription + "\n\n\t$" + numberWithCommas(coinPrice);
        // alert(msg);

        e.preventDefault();

    }); // end click function



    function renderCart() {
        cart = getFromLocalStorage();

        // for each coin in the array render an item in shopping cart
        for (var i = 0; i < cart.length; i++) {
            var coin = cart[i];
            $("#cart-content").append("<li><table><tr>" +
                "<td><img class='coin' src='" + coin.Img + "'></td>" +
                "<td>" + coin.Name + "</td>" +
                "<td id='"+coin.id+"'>" + coin.Quantity + "x</td>" +
                "<td>$" + numberWithCommas(coin.Price) + "</td>" +
                "</tr></table></li>");
        }

        // total amount in the cart
        theTotal = cartTotal();
        $("#total").text(numberWithCommas(theTotal.toFixed(2)));
    }


    // each time on hover refresh cart from local storage
    $('.dropdown').hover(function() {
        $("#cart-content").html("");
        renderCart();
    });


}); // end ready function













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


    // on price button click
    $("button").click(function(e){
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


        // if a coin is already in the cart then update only quantity
        if (coinQuantity === 0) {
            itemQuantities[btnIndex] += 1;
            $(".dropdown-menu span").append("<li><table><tr>" +
                "<td><img class='coin' src='" + coinImg + "'></td>" +
                "<td>" + coinName + "</td>" +
                "<td id='"+btnIndex+"'>" + itemQuantities[btnIndex] + "x</td>" +
                "<td>$" + numberWithCommas(coinPrice) + "</td>" +
                "</tr></table></li>");
        }
        else {
                itemQuantities[btnIndex] += 1;
                sel = "#" + btnIndex;
                $(sel).text(itemQuantities[btnIndex] + "x");
        }

        // alert("You clicked button: " + idClicked + ", item price = " + coinPrice);

        // total amount in the cart
        theTotal = Number(theTotal) + Number($(this).val());
        $("#total").text(numberWithCommas(theTotal.toFixed(2)));

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

}); // end ready function












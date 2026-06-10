
var tabTop=`<table>
    <thead>
        <tr><th>Name</th><th>Product</th><th>Qty</th><th>Sub Total</th><th>Total</th></tr>
    </thead>
    <tbody>`
var tabCt=``
var tabBot=`</tbody></table>`



function getPrice(type){
    var price = 0;

    if(type == "laptop"){
        price = 1000;
    }else if (type ==  "tablet"){
        price = 600;
    }else{
        price = 400;
    }
    return price;
}

function calculateDiscount(subTotal, promoCode){
    if(promocode ="SAVE20"){
        subTotal -= 20;
    }
    return subTotal;
}

function calculateFinalTotal(subTotal, taxes){

    return subTotal*(1+taxes/100);
}

function regTest(value, regEx){
    return regEx.test(value);
}

function processForm(){
    
    var subTotal=0
    var total = 0;

    var errors=""
    var postPattern = /^[a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d$/
    var phonePattern =/^\d{3}(\s|-)\d{3}(\s|-)\d{4}$/
    var fm = document.forms["custform"];
    var name= fm["cname"].value;
    var type= fm["ptype"].value;
    var qty= fm["qty"].value;
    var promo= fm["pcode"].value;
    var postal= fm["postal"].value;
    var phone= fm["phone"].value;
   
    if(name.length < 2){
        errors+= `<h3>Name Should be at least 2 chars</h3>`
    }
    if(qty < 1){
        errors+=`<h3>Quantity should at least be 1 </h3>`
    }
    if(!regTest(postal, postPattern)){
            errors+=`<h3>Incorrect Postal Code e.g: A1B 3A5 </h3>`
    }

    if(!regTest(phone, phonePattern)){
            errors+=`<h3>Incorrect Phone Number e.g: 222 222 2222 </h3>`
    }
    
    if(errors !=""){
        document.getElementById("right").innerHTML = errors;
    }else{
        document.getElementById("right").innerHTML =""

        subTotal = getPrice(type) * qty;
        subTotal = calculateDiscount(subTotal,promo).toFixed(2);
        total = calculateFinalTotal(subTotal, 13).toFixed(2);

        tabCt = tabCt + `<tr>
            <td>${name}</td>
            <td>${type}</td>
            <td>${qty}</td>
            <td>${subTotal}</td>
            <td>${total}</td>
        </tr>`

        document.getElementById("right").innerHTML = tabTop+tabCt+tabBot;

    }
   

    return false;
}
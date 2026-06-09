let orderCount = 0;
let totalQuantity = 0;
let totalRevenue = 0;

function getPrice(productType){

    if(productType === "Laptop"){
        return 1000;
    }

    if(productType === "Tablet"){
        return 600;
    }

    return 400;
}

function calculateDiscount(subTotal, quantity, promoCode){

    let discount = 0;

    if(quantity >= 3){
        discount += subTotal * 0.10;
    }

    if(promoCode === "SAVE20"){
        discount += 20;
    }

    return discount;
}

function calculateFinalTotal(subTotal, discount){

    let afterDiscount = subTotal - discount;

    let tax = afterDiscount * 0.13;

    return afterDiscount + tax;
}

function validateWithRegExp(expression, text){

    return expression.test(text);
}

function updateSummary(){

    document.getElementById("summary").innerHTML =
    `
        <p>Total Orders: ${orderCount}</p>
        <p>Total Quantity: ${totalQuantity}</p>
        <p>Total Revenue: $${totalRevenue.toFixed(2)}</p>
    `;
}

function addOrder(){

    let customerName =
    document.getElementById("customerName").value;

    let productType =
    document.getElementById("productType").value;

    let quantity =
    parseInt(document.getElementById("quantity").value);

    let promoCode =
    document.getElementById("promoCode").value;

    let postalCode =
    document.getElementById("postalCode").value;

    let phoneNumber =
    document.getElementById("phoneNumber").value;

    let validName = customerName.trim();

    let count = 0;

    for(let i = 0; i < validName.length; i++){

        count++;

    }

    if(count < 2){

        document.getElementById("messageArea").innerHTML =
        "Customer name must contain at least 2 characters.";

        return;
    }

    if(!Number.isInteger(quantity) || quantity < 1){

        document.getElementById("messageArea").innerHTML =
        "Quantity must be at least 1.";

        return;
    }

    let postalPattern =
    /^[A-Za-z][0-9][A-Za-z]\s[0-9][A-Za-z][0-9]$/;

    if(!validateWithRegExp(postalPattern, postalCode)){

        document.getElementById("messageArea").innerHTML =
        "Invalid postal code.";

        return;
    }

    let phonePattern =
    /^\(?\d{3}\)?[- ]\d{3}[- ]\d{4}$/;

    if(!validateWithRegExp(phonePattern, phoneNumber)){

        document.getElementById("messageArea").innerHTML =
        "Invalid phone number.";

        return;
    }

    let price = getPrice(productType);

    let subTotal = price * quantity;

    let discount =
    calculateDiscount(
        subTotal,
        quantity,
        promoCode
    );

    let finalTotal =
    calculateFinalTotal(
        subTotal,
        discount
    );

    orderCount++;

    totalQuantity += quantity;

    totalRevenue += finalTotal;

    document.getElementById("tableBody").innerHTML +=
    `
        <tr>
            <td>${orderCount}</td>
            <td>${customerName}</td>
            <td>${productType}</td>
            <td>${quantity}</td>
            <td>$${subTotal.toFixed(2)}</td>
            <td>$${discount.toFixed(2)}</td>
            <td>$${finalTotal.toFixed(2)}</td>
        </tr>
    `;

    document.getElementById("messageArea").innerHTML =
    "Order added successfully.";

    updateSummary();
}
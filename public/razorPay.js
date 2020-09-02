
const selectedService=document.getElementById("selectedService");
const paymentButton=document.getElementById('paymentButton');
selectedService.addEventListener("change",function(){
        paymentButton.classList.add("hide");
})


let amount;
let orderID;
const item1=document.getElementById('checkGetId1');
 item1.addEventListener("click",async function(){
    paymentButton.classList.remove("hide");
    const orderurl="http://localhost:3000/orders"
    // const amount= $("#selectedService :selected").getattribute('value');
    const optionSelected=$("#selectedService").find(':selected').attr('value');
    // var price = parseFloat(priceElement.innerText.replace('$', '')) * 100
    // var price = (JSON.stringify(amount).replace('{','')).replace('}','');
    // console.log(amount.replace('$', ''));
    // const vall=parseInt(price);
    let price1 = parseFloat(priceElement1.innerText)
    let price2 = parseFloat(priceElement2.innerText)
    
    if(optionSelected === "ITR"){
        amount=price1;
    }
    else if(optionSelected === "GST"){
        amount=price2;
    }
    console.log(amount);
     
    // console.log(price);

    // console.log(vall);
    const orderdata={
        "amount":amount*100,  
        "currency": "INR",
        "receipt": "order_rcptid_11",
        "payment_capture": '1'
      };
    const orderparams={
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(orderdata)
            };
            const reponse1=await fetch(orderurl,orderparams)
            const jsondata=await reponse1.json();
            orderID=jsondata.id;
            console.log(orderID);

var options = {
    "key": razorPublicKey, // Enter the Key ID generated from the Dashboard
    "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Chetanya",
    "description": "Test Transaction",
   
    "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://enbrbemirbei5ge.m.pipedream.net",
    
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#F37254"
    }
};
var rzp1 = new Razorpay(options);
document.getElementById('rzp-button1').onclick = function(e){
    rzp1.open();
    e.preventDefault();
}

})


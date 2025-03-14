
const selectedService=document.getElementById("selectedService");
const paymentButton=document.getElementById('paymentButton');
selectedService.addEventListener("change",function(){
        paymentButton.classList.add("hide");
})

console.log(option_value);
let amount;
let product_name;
let orderID;
const item1=document.getElementById('checkGetId1');
 item1.addEventListener("click",async function(){
    paymentButton.classList.remove("hide");
    const orderurl="http://taxargo.com/orders"
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
        product_name="ITR"
    }
    else if(optionSelected === "GST"){
        amount=price2;
        product_name="GST"
    }
    
     
    // console.log(price);

    // console.log(vall);
    const orderdata={
        "amount":amount*100,  
        "currency": "INR",
        "receipt": "order_rcptid_11",
        "payment_capture": '1',
        "customVID":customVID,
        "product_name":product_name
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
    "name": "Taxargo",
    "description": "Real Transaction",
   
    "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        console.log(response);
                    const paymenturl=`/verify${customVID}`
                    const paymentdata={
                        "razorpay_payment_id":response.razorpay_payment_id,  
                        "razorpay_order_id": response.razorpay_order_id,
                        "razorpay_signature": response.razorpay_signature,
                        "customVID":customVID,
                        "product_name":product_name

                        };
                    const paymentparams={
                            method:'POST',
                            headers:{
                            'Content-Type':'application/json'
                                    },
                             body: JSON.stringify(paymentdata)
                            };
                            fetch(paymenturl,paymentparams)
                            .then(response => response.json())
                            .then((jsondata)=>{
                                console.log(jsondata.message);
                                if(jsondata.message === "success"){
                                    location.reload();
                                    
                                }
                            })
                             
                            },
    
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#528FF0"
    }
};
var rzp1 = new Razorpay(options);
document.getElementById('rzp-button1').onclick = function(e){
    rzp1.open();
    e.preventDefault();

}

})


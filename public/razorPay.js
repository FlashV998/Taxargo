

// var total=e;
// console.log(total);
    // const paymentHandler = async (e) => {
    // const API_URL = 'http://localhost:3000/'
    // e.preventDefault();
    // const orderUrl = `${API_URL}order`;
    // const response = await Axios.get(orderUrl);
    // const { data } = response;      //to get orderID
    // console.log(data);
    // function getId(){
    //     const url=`${API_URL}order`
    //     fetch(url)
    // }
    
    // const options = {
    //   key: process.env.RAZOR_PAY_TEST_KEY,
    //   name: "MODI_INCOME",
    //   description: "Some Description",
    //   order_id: data.id,
    //   handler: async (response) => {
    //     try {
    //      const paymentId = response.razorpay_payment_id;
    //      const url = `${API_URL}capture/${paymentId}`;
    //      const captureResponse = await Axios.post(url, {})
    //      console.log(captureResponse.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
    //   theme: {
    //     color: "#686CFD",
    //   },
    // };
    // var rzp1 = new Razorpay(options);
    //     document.getElementById('rzp-button1').onclick = function(e){
    //         rzp1.open();
    //         e.preventDefault();
    //     }

   
    // }


// console.log(razorPublicKey);
//  const item=document.getElementById('checkGetId');
//  item.addEventListener("click",function(){

//         const url='http://localhost:3000/orders'
//     fetch(url)
//     .then(function(response){
        
//         return response.json();
//     })
//     .then((data)=>{
//         status=data.status;
//         orderID=data.id;
//         console.log(orderID);
//         console.log(status);
//     })
//     .catch(
//     console.log("error occured")
//     )
//     })
const selectedService=document.getElementById("selectedService");
const paymentButton=document.getElementById('paymentButton');
selectedService.addEventListener("change",function(){
        paymentButton.classList.add("hide");
})



let orderID;
const item1=document.getElementById('checkGetId1');
 item1.addEventListener("click",async function(){
    paymentButton.classList.remove("hide");
    const orderurl="http://localhost:3000/orders"
    const amount= $("#selectedService :selected").val();
    
    // console.log(amount.replace('$', ''));
    console.log(amount);
    const orderdata={
        "amount":100,  
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
})
var options = {
    "key": razorPublicKey, // Enter the Key ID generated from the Dashboard
    "amount": 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Chetanya",
    "description": "Test Transaction",
   
    "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://ee8e53cbf2bd2eea25436d2c412af69c.m.pipedream.net",
    
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



// const item=document.getElementById('gst1');
// item.addEventListener("click",function(e){
// total=e.target.getAttribute('data-price');
// console.log(total);
    
// });

// "handler": function(response){
    // const postUrl="https://ee8e53cbf2bd2eea25436d2c412af69c.m.pipedream.net";

    //  const pId=response.razorpay_payment_id;
    //  const oID=response.razorpay_order_id;
    //  const signature=response.razorpay_signature;


    // console.log(response.razorpay_order_id);
    // console.log(response.razorpay_signature);
    // console.log(response.razorpay_payment_id);
    // const data={response};
    // const params={
    //     method:'POST',
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body: JSON.stringify(data)
    // };
    // const reponse1=await fetch(postUrl,params)
    // const jsondata=await response.json();
    // },
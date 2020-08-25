

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
var orderID;
var id;
// console.log(razorPublicKey);
 const item=document.getElementById('checkGetId');
 item.addEventListener("click",function(){

        const url='http://localhost:3000/orders'
    fetch(url)
    .then(function(response){
        
        return response.json();
    })
    .then((data)=>{
        status=data.status;
        orderID=data.id;
        console.log(orderID);
    })
    .catch(
    console.log("error occured")
    )
    })

var options = {
    "key": razorPublicKey, // Enter the Key ID generated from the Dashboard
    "amount": 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Chetanya",
    "description": "Test Transaction",
   
    "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    
    "handler": function (response){
         postUrl="http://localhost:3000/verify";
         data={"razorpay_payment_id":response.razorpay_payment_id,"razorpay_order_id":response.razorpay_order_id,"razorpay_signature":response.razorpay_signature}
         params={
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
        fetch(postUrl,params)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
        console.log("lol");    
        })
        .catch(function(err){
            console.log("error occured u mthfkr");
        })
        
    },
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


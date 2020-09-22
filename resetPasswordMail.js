"use strict";
const nodemailer = require("nodemailer");

async function sendResetLink(email,id,opt,data) {
  let mailOptions;
  let fileItems=[];
  // console.log(data);
  if(data !== null){
  data.forEach(element => {
    const file=element.file1.toString('base64');
    fileItems.push(file);
  });}
  // const hle=data.file1.toString('base64');
  // console.log(hle);
    
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    service:"Godaddy",
    port: 25,
    secure: false,
    requireTLS:true,
    debug: true,
    auth: {
      user: process.env.EMAIL_ADDRESS, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  if(opt == 1){
    mailOptions={
     from: 'Taxargo <support@taxargo.com>', // sender address
     to: email, // list of receivers
     subject: "RESET PASSWORD LINK OF TAXSUPPPORT", // Subject line
     html: `<b>CLICK THE FOLLOWING LINK TO RESET YOUR PASSWORD,link:http://localhost:3000/reset${id}</b>`, // html body
     text: `CLICK THE FOLLOWING LINK TO RESET YOUR PASSWORD,link:http://taxargo.com/reset${id}` // plain text body
   }
  
  }
  else if(opt == 2){
    mailOptions={
     from: 'Taxargo <support@taxargo.com>', // sender address
     to: email, // list of receivers
     subject: "REGISTERED ON TAXSUPPPORT", // Subject line
     html: `<b>Thank You ${email},for choosing Taxargo,you are now registered.Use login page to avail our services.</b>`, // html body
     text: `Thank You ${email},for choosing Taxargo,you are now registered.Use login page to avail our services.`, // plain text body
   }
  
  }
  else if(opt == 3){
    mailOptions={
     from: 'Taxargo <support@taxargo.com>', // sender address
     to: 'support@taxargo.com', // list of receivers
     subject: "New User is Registered ON Taxargo", // Subject line
     html: `<b>This User is Registered:${email},his file details are given below</b>`, // html body
     text: `$This User is Registered:{email},his file deatils are given below`, // plain text body
     attachments: [
      {
          filename: "file1.gif",
          path: `data:${data[0].file1Type};charset=utf-8;base64,${fileItems[0]}`
      },
      {
          filename: "file2.gif",
          path: `data:${data[1].file1Type};charset=utf-8;base64,${fileItems[1]}`
      },
      {
          filename: "file3.gif",
          path: `data:${data[2].file1Type};charset=utf-8;base64,${fileItems[2]}`
      },
      {
          filename: "file4.gif",
          path: `data:${data[3].file1Type};charset=utf-8;base64,${fileItems[3]}`
      },
  ]
    }
  } 
  
  let info = await transporter.sendMail(mailOptions,(error)=>{
      if(error){
          console.log(error);
      }
    
  });

  }




  module.exports = sendResetLink;
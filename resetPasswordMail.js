"use strict";
const nodemailer = require("nodemailer");

async function sendResetLink(email,id) {
  
    // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    // 
    // secure: false, // true for 465, false for other ports
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
    
  let mailOptions={
    from: 'Taxargo <support@taxargo.com>', // sender address
    to: email, // list of receivers
    subject: "RESET PASSWORD LINK OF TAXSUPPPORT", // Subject line
    html: `<b>CLICK THE FOLLOWING LINK TO RESET YOUR PASSWORD,link:http://localhost:3000/reset${id}</b>`, // html body
    text: `CLICK THE FOLLOWING LINK TO RESET YOUR PASSWORD,link:http://taxargo.com/reset${id}` // plain text body
  }
  
  let info = await transporter.sendMail(mailOptions,(error)=>{
      if(error){
          console.log(error);
      }
    
  });

  }

  module.exports = sendResetLink;
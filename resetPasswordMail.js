"use strict";
const nodemailer = require("nodemailer");

async function sendResetLink(email,id) {
  
    let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service:'gmail',
    auth: {
      user: 'chetanya002@gmail.com', // generated ethereal user
      pass: process.env.GMAILPASS, // generated ethereal password
    },
  });
    
  let mailOptions={
    from: '"Fred Foo 👻" <chetanya002@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "RESET PASSWORD LINK", // Subject line
    text: `CLICK THE FOLLOWING LINK TO RESET YOUR PASSWORD,link:http:localhost:3000/resetpassword/${id}`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  }
  
  let info = await transporter.sendMail(mailOptions,(error)=>{
      if(err){
          console.log(err);
      }
    
  });

  }

  module.exports = sendResetLink;
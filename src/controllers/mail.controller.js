const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_MAIL = process.env.EMAIL_MAIL;

console.log('>> process.env.EMAIL_MAIL ', process.env.EMAIL_MAIL);


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: EMAIL_MAIL, 
        pass: EMAIL_PASSWORD, 
    },
    tls: { rejectUnauthorized: false }, 
});

async function sendReceiptEmail(data) {

    console.log('>> sendReceiptEmail');
    console.log('data == ', data);

    const info = await transporter.sendMail({
        from: "otp.essentialBank.com",             
        to: data.email,            
        subject: `Verifica tu código de acceso | Essential Bank`, 
        html: `<p>  Introduce el siguiente código para verificar tu correo  ${data.token} </p>`
    })

    console.log("Message sent: %s", info);

}
sendReceiptEmail().catch(console.error);

module.exports = {sendReceiptEmail}

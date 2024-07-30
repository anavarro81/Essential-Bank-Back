const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_MAIL = process.env.EMAIL_MAIL;


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: EMAIL_MAIL, 
        pass: EMAIL_PASSWORD, 
    },
    tls: { rejectUnauthorized: false }, 
});

module.exports.sendReceiptEmail = (data) => {       

    // console.log('>> EMAIL_MAIL : ', EMAIL_MAIL)
    // console.log('>> EMAIL_PASSWORD >> : ', EMAIL_PASSWORD)

    transporter 
        .sendMail({
            from: "otp.essentialBank.com",             
            to: data.email,            
            subject: `Verifica tu código de acceso | Essential Bank`, // Asunto del correo electrónico
            html: `

        <h1> Verifica tu correo electronico </h1>

        <p>  Introduce el siguiente código para verificar tu correo </p>

        <h2> ${data.token} </h2>        
        
            ` // Contenido HTML del correo electrónico
        })
        .then(() => { 
            console.log("email sent!"); 
            return {code: 200, message: 'email enviado correctamente'}
        })
        .catch((err) => { 
            console.error("error sending email, ", err); 
            return {code: 500, message: 'Error enviando el correo'}
        });
};


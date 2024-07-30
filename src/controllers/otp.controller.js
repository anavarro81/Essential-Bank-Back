const Otp = require("../models/otp.model");
const User = require("../models/user.model")
const {sendReceiptEmail} = require('../controllers/mail.controller')

const generateToten = async (id, email) => {

    console.log('generateToten');
    console.log('id = ', id );
    console.log('emai= ', email );    

    // Genera un token de cuatro digitos de forma aleatoria
    let token = ''
    for (let index = 0; index < 4; index++) {        
        
        let randomNumber = Math.floor(1 + Math.random() * 9);
        token = token + randomNumber
    }

    const otp = {
        UserID: id,
        email: email,
        token: token    
    }

    console.log('otp ', otp);
    
    try {        
        
        const newOtp = new Otp(otp)    
        const createdOtp = await newOtp.save();         
        

        if (createdOtp) {

            sendReceiptEmail(otp)

            return {code: 200, messaje: 'token creado correctamente'}
        }
    } catch (error) {
        console.log('Se ha producido un error al generar el token ', error);
        return {code: 404, message: error}
    }


}


const checkToken = async(req, res) => {   
    
    console.log('Estoy en checkToken');
    console.log('req.body ', req.body);

    try {

        const userOtp = await Otp.findOne({ email: req.body.email })     

        console.log('userOtp ', userOtp);

        // Si no encuentro el emai, devuelvo error
        if (!userOtp) {

            console.log('Email no encontrado');
            return {code: 404, message: 'Email no encontrado'}
        }

        console.log('userOtp.token > ', userOtp.token);


        if (userOtp.token == req.body.token) {   
            console.log('token correcto');         
            return res.status(200).json({message: "OTP correcto"})
        } else {
            console.log('token no correcto');         
            return res.status(403).json({message: "OTP incorrecto"})
        }              

    } catch (error) {
        console.log('Error al validar el Token', error)
        return res.status(500).json({message: `Error al validar el token ${error}`})    
    }

    


    // Si no existe el correo, dar error

    // Si hay datos, comprobar si coincidie

    // Si coincide devolver ok para que continue error=200

    // Si no coincide devolver error = 403

}

module.exports = {generateToten, checkToken}
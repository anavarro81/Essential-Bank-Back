const Account = require("../models/account.model");

const withdrawMoney = async (req, res) => {    

    try {

        console.log('>> withdrawMoney');
      
        const { id } = req.params;

        console.log('>> id: ', id);

        // Recupero la cuenta por Id.
        const selectedAccount = await Account.findById(id)

        console.log('>> selectedAccount : ', selectedAccount)

        let newBalance = 0

        // Si encuentro la cuenta, calculo en nuevo saldo. 
        if (selectedAccount) {
            console.log('>> Descontar saldo...')
            console.log(typeof req.body.amount)
            newBalance = selectedAccount.Balance - req.body.amount
            console.log('>> newBalance ', newBalance)

        } else {
            return res.status(500).json({error: `No se ha encontrado la cuenta con id: ${id} `});
        }      

        // Actualizo el monto de la cuenta
        console.log('>> actualizo importe...')
        console.log('>>>>>> newBalance ', newBalance)

        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            {
            $set: {
                Balance: newBalance            
            }
            },
            { new: true }
        );

        console.log('>> updatedAccount...', updatedAccount)

        if (!updatedAccount) {
            return res.status(404).json({ message: `Transaccion realizada correctamente. El nuevo monto es: ${newBalance}` });
        }
        return res.status(200).json(updatedAccount);
    } catch (error) {
        console.log('>> error : ', error)
      return res.status(500).json(error);
    }
  };
  module.exports = {withdrawMoney};
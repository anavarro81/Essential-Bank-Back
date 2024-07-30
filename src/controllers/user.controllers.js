const User = require("../models/user.model");
const Account = require("../models/account.model");
const {generateToten} = require ('../controllers/otp.controller')
const {randomAccounts}  = require("../data/randomAccounts");

const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  usedEmail,
} = require("../utils/validators");
const { generateSign } = require("../utils/jwt");



const register = async (req, res) => {


  console.log('Estoy en register...');
  
  try {
    
    const newUser = new User(req.body);

    
    
    
    if (!validateEmail(newUser.email)) {
      return res.status(400).json({ message: " email invalido" });
    }

    // if (!validatePassword(newUser.password)) {
    //   return res.status(400).json({ message: " password invalido" });
    // }

    if (await usedEmail(newUser.email)) {
      console.log('email ya existe');
      return res.status(409).json({ error: 'El email ya existe' });
    }       


    // En la segunda pantalla no pide la password. 
    // newUser.password = bcrypt.hashSync(newUser.password, 10);    

    

      var numAccount = Math.floor(Math.random() * 10); 
      

      const accountData = {
        UserID: newUser._id,
        Holder: newUser.name,
        Bank: randomAccounts[numAccount].Bank,
        IBAN: randomAccounts[numAccount].IBAN,
        Balance: randomAccounts[numAccount].Balance,
      }
      

      const result = await createAccount(accountData) 


      if (result.code == 201) {
        
        newUser.accounts.push(result.account_id)
        const createdUser = await newUser.save();

        let response = await generateToten(createdUser._id, createdUser.email)


        if (response.code == 200) {
          return res.status(201).json(createdUser);  
        } else {
          return res.status(500).json(response.message)
        }
        
      } else {
        return res.status(500).json(result.error)
      }          
    

    
  } catch (error) {
    console.log('Error en register ', error);
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  
  console.log('login');
  
  try {

    
  
    const userInfo = await User.findOne({ email: req.body.email })    

    console.log('userInfo > ', userInfo);

    if (!userInfo) {
      console.log('Email no encontrado');
      return res.status(404).json({ message: "email no encontrado" });
    }       

    console.log('req.body.password ', req.body.password);
    console.log('userInfo.password', userInfo.password);
    
    if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
      console.log('password incorrecto');
      return res.status(404).json({ message: "password incorrecto" });
    }  
    
    const token = generateSign(userInfo._id, userInfo.email);   

     userInfo.password = undefined

    return res.status(200).json({ user: userInfo, token: token, role: userInfo.role, id: userInfo._id});
  } catch (error) {
    console.log('Error en el login ',  error);
    return res.status(500).json(error);
  }
};

// Obtiene todos los usuarios
const getUsers = async (req, res) => {
  try {
    const allUser = await User.find().populate('accounts')
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

  const getUser = async (req, res) => {
    try {
      
      const { id } = req.params;
      const selectedUser = await User.findById(id).populate('accounts')

      if (!selectedUser) {
        return res.status(404).json({message: `No encontra usuario con id: ${id}` })          
      }
      
      return res.status(200).json(selectedUser)          


    } catch (error) {
      
    }
  }
  
  // Actualia nombre y correo del usuario. 
  const updateUser = async (req, res) => {

    

    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email
          }
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "no existe este id de usuario" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  };


  // Borra usuario.
  const deleteUser = async (req, res) => {
    try {
      const {id} = req.params;
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
          return res.status(404).json({message:"este id no existe"})
      }
      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json(error)
    }
  };


  const createAccount = async (accountData) => {

    console.log('Estoy en createAccount ' )
    
    try {
      
      const newAccount = new Account(accountData)

      console.log('>> newAccount : ', newAccount)

      const createdAccount = await newAccount.save();

      console.log('>> createdAccount : ', createdAccount)


      if (createdAccount) {
        console.log('Se ha creado la cuenta correctamente')
        console.log('>> createdAccount : ', createdAccount)
        return {code: 201, account_id: createdAccount._id}
      }

    } catch (error) {
      return {code: 500, error: error}
    }

  }
  

  const deleteAllUser = async (req, res) => {
    try {
      const result = await User.deleteMany({});
      console.log(`Se han borrado ${result.deletedCount} registros.`);
      res.status(200).json({message: 'Se han borrado todos los usuarios'})
    } catch (error) {
      console.error('Error al borrar los registros:', error);
      res.status(500).json({message: `Error al borraro los usuarios ${error}`})
    }
  }


  const setPassword = async (req, res) => {
    
    console.log('>> setPassword ', setPassword);
    console.log('req.body ', req.body);

    try {
      
      const newPassword = bcrypt.hashSync(req.body.password, 10); 

      console.log('newPassword ', newPassword);

      const userInfo = await User.findOne({ email: req.body.email })

      console.log('userInfo ', userInfo);

      if (userInfo) {
        const updatedUser = await User.findByIdAndUpdate(
          userInfo._id,
          {
            $set: {
              password: newPassword            
            }
          },
          { new: true }
        );

        if (updateUser) {
          res.status(200).json(updatedUser)
        }
        
      } else {
        res.status(404).json({error: 'No se ha encontrado el email '})
      }
      



      
    } catch (error) {
      console.log('error en setPassword ', error);
    }
  }



module.exports = { register, login, updateUser, deleteUser, getUsers, getUser, deleteAllUser, setPassword  };

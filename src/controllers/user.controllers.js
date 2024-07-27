const User = require("../models/user.model");
const Account = require("../models/account.model");
const {randomAccounts}  = require("../data/randomAccounts");

const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  usedEmail,
} = require("../utils/validators");
const { generateSign } = require("../utils/jwt");



const register = async (req, res) => {
  
  
  
  try {
    const newUser = new User(req.body);
    if (!validateEmail(newUser.email)) {
      return res.status(400).json({ message: " email invalido" });
    }
    // if (!validatePassword(newUser.password)) {
    //   return res.status(400).json({ message: " password invalido" });
    // }
    if (await usedEmail(newUser.email)) {
      return res.status(400).json({ message: " email introducido ya existe" });
    }    

    console.log('>> newUser : ', newUser)

    newUser.password = bcrypt.hashSync(newUser.password, 10);    

    const createdUser = await newUser.save();

    if (createdUser) {

      console.log('createdUser-OK');

      var numAccount = Math.floor(Math.random() * 10);     

      console.log('numAccount ', numAccount);
      
      console.log('>> randomAccounts : ', randomAccounts)
      console.log(typeof randomAccounts)

      console.log('>> randomAccounts[numAccount].Bank : ', randomAccounts[numAccount].Bank)
      

      const accountData = {
        UserID: createdUser._id,
        Holder: createdUser.name,
        Bank: randomAccounts[numAccount].Bank,
        IBAN: randomAccounts[numAccount].IBAN,
        Balance: randomAccounts[numAccount].Balance,
      }
      

      const result = await createAccount(accountData) 

      console.log('result ', result);

      if (result == 201) {
        return res.status(201).json(createdUser);
      } else {
        return res.status(500).json(result)
      }
        
      
    }

    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
  
    const userInfo = await User.findOne({ email: req.body.email })    

    if (!userInfo) {
      return res.status(404).json({ message: "email no encontrado" });
    }      
    


    if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
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
    const allUser = await User.find()
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

  const getUser = async (req, res) => {
    try {
      
      const { id } = req.params;
      const selectedUser = await User.findById(id)

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
        return 201
      }

    } catch (error) {
      return 500
    }

  }
  



module.exports = { register, login, updateUser, deleteUser, getUsers, getUser  };

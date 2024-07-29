const Transation = require ("../models/transation.model")
const User = require("../models/user.model");


// Alta de nueva operacion favorita. 
// Se asocia la operacion al usuario. 
const newTransation = async (req, res) => {
    try {        
        const newTransation = new Transation(req.body)


        const createdTransation = await newTransation.save();
        
        if (createdTransation) {

            // Se inserta el id de operacion en el array Transations del usuario para vincurlarla con este. 

            console.log('req.body.Userid ', req.body.UserID);
            console.log('createdTransation._id ', createdTransation._id);

            const updatedUser = await User.findOneAndUpdate(
              {_id: req.body.UserID},
              {$push: {Transations: createdTransation._id}}
            );
            
            console.log('updatedUser > ', updatedUser);
            
            return res.status(200).json(createdTransation)
        
          }
    } catch (error) {
        console.log('Error al insertar la operacion favorita ', error);
        return res.status(500).json(error)
    }
}

//Obtiene las operaciones favoritas de un usuario. 
const getTransationTransation = async (req, res) => {
    try {
      
      const { id } = req.params;
      // const selectedTransation = await Transation.findById(id)
      const selectedTransation = await Transation.find({ UserID: id })

      

      if (!selectedTransation) {
        return res.status(404).json({message: `No encontrado usuario con id: ${id}` })          
      }

      console.log('>> amtes del return ')
      
      return res.status(200).json(selectedTransation)          


    } catch (error) {
        console.log('>> Se ha producido eun error al obtner la operación ', error)
        return res.status(500).json({'error' : error})          
    }
  }

  // Obtiene todas las trasferencias favoritas de un usuario
const getTransationsTransfers = async (req, res) => {   
       
  
    try {
      const {id} = req.params;      

      const selectedTransation = await Transation.find(
        { UserID: id,
          type: 'trasferencia'
        })        

        if (selectedTransation) {
          return res.status(200).json(selectedTransation)
        }

    } catch (error) {
      console.log('>> Se ha producido un error: ', error)
      return res.status(200).json(selectedTransation)
    }
  }

  // Obtiene los pagos por servicio favoritos de un usuario.
const getTransationsPays = async (req, res) => {   
       
  
  
    try {
      const {id} = req.params;      

      const selectedTransation = await Transation.find(
        { UserID: id,
          type: 'pago por servicio'
        })  
        
        console.log('>> selectedTransation : ', selectedTransation)

        if (selectedTransation) {
          if (selectedTransation.length > 0) {
            return res.status(200).json(selectedTransation)
          }else {
            console.log('No se han encontrado datos');
            return res.status(404).json({message: 'No se han encontrado operaciones de pago por servicios para este usuario'})
          }
        }

    } catch (error) {
      console.log('>> Se ha producido un error: ', error)
      return res.status(200).json(selectedTransation)
    }
  }


module.exports = { newTransation, getTransationTransation, getTransationsTransfers, getTransationsPays };


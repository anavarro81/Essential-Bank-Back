const FavouriteTranstion = require ("../models/favouriteTransation.model")
const User = require("../models/user.model");


// Alta de nueva operacion favorita. 
// Se asocia la operacion al usuario. 
const newfavourite = async (req, res) => {
    try {        
        const newFavourite = new FavouriteTranstion(req.body)


        const createdFavourite = await newFavourite.save();
        
        if (createdFavourite) {

            // Se inserta el id de operacion en el array favourites del usuario para vincurlarla con este. 

            console.log('req.body.Userid ', req.body.UserID);
            console.log('createdFavourite._id ', createdFavourite._id);

            const updatedUser = await User.findOneAndUpdate(
              {_id: req.body.UserID},
              {$push: {favourites: createdFavourite._id}}
            );
            
            console.log('updatedUser > ', updatedUser);
            
            return res.status(200).json(createdFavourite)
        
          }
    } catch (error) {
        console.log('Error al insertar la operacion favorita ', error);
        return res.status(500).json(error)
    }
}

// Obtiene las operaciones favoritas de un usuario. 
const getFavouriteTransation = async (req, res) => {
    try {
      
      const { id } = req.params;
      // const selectedTransation = await FavouriteTranstion.findById(id)
      const selectedTransation = await FavouriteTranstion.find({ UserID: id })

      

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
const getFavouritesTransfers = async (req, res) => {   
       
  
    try {
      const {id} = req.params;      

      const selectedTransation = await FavouriteTranstion.find(
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
const getFavouritesPays = async (req, res) => {   
       
  
  
    try {
      const {id} = req.params;      

      const selectedTransation = await FavouriteTranstion.find(
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


module.exports = { newfavourite, getFavouriteTransation, getFavouritesTransfers, getFavouritesPays };
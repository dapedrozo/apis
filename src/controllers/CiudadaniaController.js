const crypto = require('crypto')

const ciudadaniaCtrl = {};
const {InfoGenUsuario} = require('../models/CiudadaniaModels.js')
const {SesionesGeneralUser} = require('../models/CiudadaniaModels')
const {DevicesBySessions} = require('../models/CiudadaniaModels')


/*
####################################################################################################
methods get (all) ciudadanos
####################################################################################################
*/

ciudadaniaCtrl.AllUsersCiudadania = async (req, res) => {
    const estLabAllPostulados = await InfoGenUsuario.find();
    res.json(estLabAllPostulados)
}

/*
####################################################################################################
methods signUp ciudadano
####################################################################################################
*/
//method get
ciudadaniaCtrl.signUpCiudadanoTemplate = async (req, res) => {
    return res.render('signUp',{csrfToken:req.csrfToken(),message:""})
}

//method post
ciudadaniaCtrl.signUpCiudadano = async (req, res) => {
    if(!req.body._csrf) {
        res.render('signUp',{message:'Ocurrio un error'})}

    const {primerNombre,segundoNombre,primerApellido,segundoApellido,tipoDocumento,numeroDocumento,fechaNacimiento,genero,correoElectronico,telefonoFijo,telefonoCel,nacionalidad,barrio,direccion,password,_csrf} = req.body
    
    try {
        const secureSalt = crypto.randomBytes(48).toString('hex')
        
        const newCiudadano = new InfoGenUsuario({
            primerNombre:primerNombre,
            segundoNombre:segundoNombre,
            primerApellido:primerApellido,
            segundoApellido:segundoApellido,
            tipoDocumento:tipoDocumento,
            numeroDocumento:numeroDocumento,
            fechaNacimiento:fechaNacimiento,
            genero:genero,
            correoElectronico:correoElectronico,
            telefonoFijo:telefonoFijo,
            telefonoCel:telefonoCel,
            nacionalidad:nacionalidad,
            barrio:barrio,
            direccion:direccion,
            password: await InfoGenUsuario.encryptPassword(password,secureSalt),
            salt:secureSalt
        });
        
        await newCiudadano.save();
        return res.render('signIn',{csrfToken:req.csrfToken(),message:"usuario creado satisfactoriamente"})

    } catch (error) {
        console.log(error)
        return res.render('signUp',{csrfToken:req.csrfToken(),message:""})
    }
}

/*
####################################################################################################
methods singIn ciudadano
####################################################################################################
*/
//method get
ciudadaniaCtrl.signInCiudadanoTemplate = async (req, res) => {
    return res.render('signIn',{csrfToken:req.csrfToken(),message:""})
}

//method post
ciudadaniaCtrl.signInCiudadano = async (req, res) => {
    console.log(req.body)
    if(!req.body._csrf) return res.send('no hay token')
    res.redirect('/api-ciudadania/get-products-ciudadania')
    
    /*
    const {tipoDocumento,numeroDocumento,password} = req.body
    try {
        const userFound = await InfoGenUsuario.findOne({tipoDocumento:tipoDocumento,numeroDocumento:numeroDocumento});
        if(!userFound) return res.json({'msg':'problema en sus credenciales'})

        const matchPassword = await InfoGenUsuario.comparePassword( userFound.password,userFound.salt, password)
        if(!matchPassword) return res.json({'msg':'problema en sus credenciales'})

        const token = jwt.sign({id:userFound._id},process.env.SECRET_ACCESS_TOKEN,{
            expiresIn: 20 //20s
        })
        res.json({token})

    } catch (error) {
        console.log(error)
        return res.json({'msg':'problema inesperado'})
    }
    */
}

/*
####################################################################################################
methods delete ciudadano
####################################################################################################
*/


ciudadaniaCtrl.DeleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const userFound = await InfoGenUsuario.findOne({_id:id})
        if(userFound){
            await InfoGenUsuario.findOneAndDelete({_id:id});
            return res.json({'msg':'usuario eliminado'})
        } else{
            return res.json({'msg':'no existe el usuario'})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({'msg':'problema inesperado'})
    }
}

module.exports = ciudadaniaCtrl;
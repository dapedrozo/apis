const crypto = require('crypto')

const funcionarioCtrl = {};

const {InfoGenFuncionario} = require('../models/FuncionarioModels')

/*
####################################################################################################
dashboard
####################################################################################################
*/
funcionarioCtrl.Dashboard = async (req, res) => {
    return res.render('funcionarioDash',{message:""})
}


/*
####################################################################################################
methods get (all) funcionarios
####################################################################################################
*/
funcionarioCtrl.AllUsersFuncionario = async (req, res) => {
    const AllFuncionarios = await InfoGenFuncionario.find();
    res.json(AllFuncionarios)
}

/*
####################################################################################################
methods signUp funcionario
####################################################################################################
*/
//method get
funcionarioCtrl.signUpFuncionarioTemplate = async (req, res) => {
    return res.render('signUpFun',{csrfToken:req.csrfToken(),message:""})
}

//method post
funcionarioCtrl.signUpFuncionario = async (req, res) => {
    if(!req.body._csrf) {
        res.render('signUpFun',{message:'Ocurrio un error'})}

    const {primerNombre,segundoNombre,primerApellido,segundoApellido,tipoDocumento,numeroDocumento,correoElectronico,telefonoCel,password,_csrf} = req.body
    
    try {
        const secureSalt = crypto.randomBytes(48).toString('hex')
        
        const newFuncionario = new InfoGenFuncionario({
            primerNombre:primerNombre,
            segundoNombre:segundoNombre,
            primerApellido:primerApellido,
            segundoApellido:segundoApellido,
            tipoDocumento:tipoDocumento,
            numeroDocumento:numeroDocumento,
            correoElectronico:correoElectronico,
            telefonoCel:telefonoCel,
            password: await InfoGenFuncionario.encryptPassword(password,secureSalt),
            salt:secureSalt
        });
        
        await newFuncionario.save();
        return res.render('signInFun',{csrfToken:req.csrfToken(),message:"funcionario creado satisfactoriamente"})

    } catch (error) {
        console.log(error)
        return res.render('signUpFun',{csrfToken:req.csrfToken(),message:""})
    }
}

/*
####################################################################################################
methods singIn ciudadano
####################################################################################################
*/
//method get
funcionarioCtrl.signInFuncionarioTemplate = async (req, res) => {
    return res.render('signInFun',{csrfToken:req.csrfToken(),message:""})
}

//method post
funcionarioCtrl.signInFuncionario = async (req, res) => {
    if(!req.body._csrf) return res.send('no hay token')
    res.redirect('/api-funcionario/dashboard')
}

/*
####################################################################################################
methods delete ciudadano
####################################################################################################
*/

funcionarioCtrl.DeleteFuncionario = async (req, res) => {
    const id = req.params.id
    try {
        const funcionarioFound = await InfoGenFuncionario.findOne({_id:id})
        if(funcionarioFound){
            await InfoGenFuncionario.findOneAndDelete({_id:id});
            return res.json({'msg':'funcionario eliminado'})
        } else{
            return res.json({'msg':'no existe el funcionario'})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({'msg':'problema inesperado'})
    }
}

module.exports = funcionarioCtrl;
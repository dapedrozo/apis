const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const {Schema, model} = require('mongoose');

//modelo informacion general ciudadania
const InfoGeneralFuncionarioSchema= new Schema({
    primerNombre: {
        type: String,
        trim: true
    },
    segundoNombre: {
        default: "",
        type: String,
        trim: true
    },
    primerApellido: {
        type: String,
        trim: true
    },
    segundoApellido: {
        default: "",
        type: String,
        trim: true
    },
    tipoDocumento: {
        type: String,
        trim: true
    },
    numeroDocumento: {
        type: String,
        trim: true
    },
    correoElectronico: {
        default: "",
        type: String,
        trim: true
    },
    telefonoCel: {
        default: "",
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    salt: {
        type: String,
        trim: true
    }
},{timestamps:true,versionKey:false});


InfoGeneralFuncionarioSchema.statics.encryptPassword = async function encrypt(password,secureSalt){
    const salt = await bcrypt.genSalt(Number(process.env.N_SALT))
    return await bcrypt.hash(crypto.createHash('sha384').update(password+secureSalt).digest('hex'),salt)
}

InfoGeneralFuncionarioSchema.statics.comparePassword = async function compare(password,salt, receivedPassword){
    return await bcrypt.compare(crypto.createHash('sha384').update(receivedPassword+salt).digest('hex'),password)
}

const InfoGenFuncionario = model('infoGeneralFuncionario',InfoGeneralFuncionarioSchema);

module.exports= {
    InfoGenFuncionario:InfoGenFuncionario
};
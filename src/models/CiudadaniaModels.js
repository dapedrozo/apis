const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const {Schema, model} = require('mongoose');

//modelo informacion general ciudadania
const InfoGeneralUsuarioSchema= new Schema({
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
    fechaNacimiento: {
        default:"2020-04-08",
        type: Date,
        trim: true
    },
    genero: {
        type: String,
        trim: true
    },
    correoElectronico: {
        default: "",
        type: String,
        trim: true
    },
    telefonoFijo: {
        default: "",
        type: String,
        trim: true
    },
    telefonoCel: {
        default: "",
        type: String,
        trim: true
    },
    nacionalidad: {
        type: String,
        trim: true
    },
    barrio: {
        type: String,
        trim: true
    },
    direccion: {
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


InfoGeneralUsuarioSchema.statics.encryptPassword = async function encrypt(password,secureSalt){
    const salt = await bcrypt.genSalt(Number(process.env.N_SALT))
    return await bcrypt.hash(crypto.createHash('sha384').update(password+secureSalt).digest('hex'),salt)
}

InfoGeneralUsuarioSchema.statics.comparePassword = async function compare(password,salt, receivedPassword){
    return await bcrypt.compare(crypto.createHash('sha384').update(receivedPassword+salt).digest('hex'),password)
}

const InfoGenUsuario = model('infoGeneralUsuario',InfoGeneralUsuarioSchema);

//modelo sesiones general
const SessionGeneralSchema= new Schema({
    idPersonaGene: {
        type: String,
        trim: true
    },
    AccessToken:{
        type: String,
        trim: true
    },
    RefreshToken:{
        type: String,
        trim: true
    },
},{timestamps:true,versionKey:false});

const SesionesGeneralUser = model('SesionesGeneral',SessionGeneralSchema);

//modelo sesiones especifica por dispositivo
const DevicesBySesionSchema= new Schema({
    idSessionGen: {
        type: String,
        trim: true
    },
    randomString: {
        type: String,
        trim: true
    },
    deviceInfoScreen: {
        type: String,
        trim: true
    },
    deviceInfoCpu: {
        type: String,
        trim: true
    },
    deviceInfoUserAgent: {
        type: String,
        trim: true
    },
    deviceInfoFonts: {
        type: String,
        trim: true
    },
    deviceInfoOs: {
        type: String,
        trim: true
    },
    deviceInfoColorDepth: {
        type: String,
        trim: true
    }
},{timestamps:true,versionKey:false});

const DevicesBySessions = model('DevicesBySession',DevicesBySesionSchema);

module.exports= {
    InfoGenUsuario:InfoGenUsuario,
    SesionesGeneralUser:SesionesGeneralUser,
    DevicesBySessions:DevicesBySessions
};
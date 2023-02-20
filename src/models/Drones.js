const {Schema, model} = require('mongoose');

//modelo sesiones general
const DronesSchema= new Schema({
    idFuncionario: {
        type: String,
        trim: true
    },
    nombreDrone:{
        type: String,
        trim: true
    },
    tipoDrone:{
        type: String,
        trim: true
    },
    estado:{
        default: "verde",
        type: String,
        trim: true
    },
    descripcion:{
        type: String,
        trim: true
    },
},{timestamps:true,versionKey:false});

const GenDrones = model('Drones',DronesSchema);

module.exports= {
    GenDrones:GenDrones,
};

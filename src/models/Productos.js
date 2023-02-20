const {Schema, model} = require('mongoose');

//modelo sesiones general
const ProductosSchema= new Schema({
    idFuncionario: {
        type: String,
        trim: true
    },
    nombreProducto:{
        type: String,
        trim: true
    },
    categoriaProducto:{
        type: String,
        trim: true
    },
    descripcion:{
        type: String,
        trim: true
    },
    precio:{
        type: Number
    },
    unidades:{
        default:0,
        type: Number
    },
    estado:{
        default: "activo",
        type: String,
        trim: true
    }
},{timestamps:true,versionKey:false});

const GenProductos = model('Productos',ProductosSchema);

module.exports= {
    GenProductos:GenProductos
};
const {Schema, model} = require('mongoose');

//modelo sesiones general
const CarritoSchema = new Schema({
    idCiudadano: {
        type: String,
        trim: true
    },
    cupones:{
        default: "no",
        type: String,
        trim: true
    },
    totalCompra:{
        default: 0,
        type: Number
    },
    gastosEnvio:{
        default: 0,
        type: Number
    },
    subtotal:{
        default: 0,
        type: Number
    },
    descuentosCupones:{
        default: 0,
        type: Number
    },
    total:{
        default: 0,
        type: Number
    },
    medioPago:{
        default:"no",
        type: String,
        trim: true
    },
    estado:{
        default:"activo",
        type:String,
        trim:true
    }
},{timestamps:true,versionKey:false});

const GenCarrito = model('Carrito',CarritoSchema);

const ProductosCarritoSchema= new Schema({
    idCarrito: {
        type: String,
        trim: true
    },
    idProducto:{
        type: String,
        trim: true
    },
    nombreProducto:{
        type: String,
        trim: true
    },
    descripcionProducto:{
        type: String,
        trim: true
    },
    cantidadProducto:{
        default:1,
        type: Number,
        trim: true
    },
    estado:{
        default:'activo',
        type:String,
        trim:true
    }
},{timestamps:true,versionKey:false});

const GenProductoCarrito = model('ProductoCarrito',ProductosCarritoSchema);


module.exports= {
    GenCarrito:GenCarrito,
    GenProductoCarrito:GenProductoCarrito
};
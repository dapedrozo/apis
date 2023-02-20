const OperCiudadaniaCtrl = {};
const {GenProductos} = require('../models/Productos')
const {GenCarrito} = require('../models/CarritoCompra')
const {GenProductoCarrito} = require('../models/CarritoCompra')

/*
####################################################################################################
CARRITO
####################################################################################################
*/
//get carrito
OperCiudadaniaCtrl.GetCarritos = async (req, res) => {
    const AllCarritos = await GenCarrito.find({estado:"activo"});
    return res.json({'carritos':AllCarritos,'token':{csrfToken:req.csrfToken()}})
}


//create carrito
OperCiudadaniaCtrl.CreateCarrito = async (req, res) => {
    const {idCiudadano} = req.body
    try {
        const newCarrito = new GenCarrito({
            idCiudadano:idCiudadano
        });
        
        await newCarrito.save();
        return res.json({'msg':'carrito creado'})

    } catch (error) {
        console.log(error)
        return res.json({'msg':'se ha producido un error'})
    }
}

/*
####################################################################################################
PRODUCTOS
####################################################################################################
*/
//get all products
OperCiudadaniaCtrl.GetAllProducts = async (req, res) => {
    
    const AllProducts = await GenProductos.find({estado:"activo"});
    const ProductosCarrito = await GenProductoCarrito.find({idCarrito:"6195a06feb1a0932bdea6fc4"})
    const listaProductos = ProductosCarrito.map(x=>x.idProducto)
    return res.render('listProductsCliente',{csrfToken:req.csrfToken(),message:"",AllProducts:AllProducts, listaProductos:listaProductos})
}

//create producto para carrito
OperCiudadaniaCtrl.CreateProductoCarrito = async (req, res) => {
    const {idCarrito,idProducto,nombreProducto,descripcionProducto} = req.body
    try {
        const newProductoCarrito = new GenProductoCarrito({
            idCarrito,
            idProducto,
            nombreProducto,
            descripcionProducto
        });
        
        await newProductoCarrito.save();
        return res.redirect('/api-ciudadania/get-products-ciudadania')

    } catch (error) {
        console.log(error)
        return res.json({'msg':'error'})
    }
}


/*
####################################################################################################
PRODUCTOS DEL CARRITO
####################################################################################################
*/
//get all carrito products
OperCiudadaniaCtrl.GetAllProductsCarrito = async (req, res) => {
    const AllProducts= await GenProductoCarrito.find({idCarrito:"6195a06feb1a0932bdea6fc4",estado:"activo"})
    return res.render('preCarritoCliente',{csrfToken:req.csrfToken(),message:"",AllProducts:AllProducts})
}

//create producto para carrito
OperCiudadaniaCtrl.CreateFacturaCarrito = async (req, res) => {
    var factura={}
    const k=Object.keys(req.body)

    for (key in k){
        if ((key%2==1)&&(k[key]!='tipoPago')&&(k[key]!='_csrf')){
            var valor = await GenProductos.find({_id:t})
            console.log(valor)
            factura[t]=req.body[k[key]]*valor[0].precio
        }
        t=req.body[k[key]]
    }
    const {tipoPago} = req.body
    console.log(factura,tipoPago)
    return res.json({factura,tipoPago})
}

//delete carrito products
OperCiudadaniaCtrl.deleteProductCarrito = async (req, res) => {
    if(!req.body._csrf) {
        res.render('preCarritoCliente',{message:'Ocurrio un error'})}

    const id = req.params.id
    const t = await GenProductoCarrito.find({idProducto:id})
    console.log(t)

    await GenProductoCarrito.findOneAndUpdate({idProducto: id},{$set:{estado:"eliminado"}})
    return res.redirect('/api-ciudadania/get-products-ciudadania')
}

module.exports = OperCiudadaniaCtrl;
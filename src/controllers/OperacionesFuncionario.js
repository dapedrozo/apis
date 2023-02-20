const OperfuncionarioCtrl = {};
const {GenProductos} = require('../models/Productos')
const {GenDrones} = require('../models/Drones')

/*
####################################################################################################
PRODUCTOS
####################################################################################################
*/
//get all products
OperfuncionarioCtrl.GetAllProducts = async (req, res) => {
    const AllProducts = await GenProductos.find({estado:"activo"});
    return res.render('listProducts',{csrfToken:req.csrfToken(),message:"",AllProducts:AllProducts})
}

//get unique product
OperfuncionarioCtrl.GetOneProduct = async (req, res) => {
    const id = req.params.id
    const OneProduct = await GenProductos.findOne({_id:id});
    res.json(OneProduct)
}

//create product method get
OperfuncionarioCtrl.CreateProductGet = async (req, res) => {
    return res.render('addProductFun',{csrfToken:req.csrfToken(),message:""})
}

//create product method post
OperfuncionarioCtrl.CreateProduct = async (req, res) => {
    if(!req.body._csrf) {
        res.render('addProductFun',{message:'Ocurrio un error'})}
    
    const {idFuncio,nombreProducto,categoriaProducto,descripcion,precio,unidades} = req.body
    try {
        const newProducto = new GenProductos({
            idFuncionario:idFuncio,
            nombreProducto:nombreProducto,
            categoriaProducto:categoriaProducto,
            descripcion:descripcion,
            precio:precio,
            unidades:unidades,
        });
        
        await newProducto.save();
        return res.render('addProductFun',{csrfToken:req.csrfToken(),message:"producto creado"})

    } catch (error) {
        console.log(error)
        return res.render('addProductFun',{csrfToken:req.csrfToken(),message:"ha ocurrido un error"})
    }
}

//update product method get
OperfuncionarioCtrl.UpdateProductGet = async (req, res) => {
    const id = req.params.id
    const ProductUpdate = await GenProductos.findOne({_id:id});
    return res.render('updateProductFun',{csrfToken:req.csrfToken(),message:"",ProductUpdate:ProductUpdate})
}

//update product method post
OperfuncionarioCtrl.UpdateProduct = async (req, res) => {
    if(!req.body._csrf) {
        res.render('updateProductFun',{message:'Ocurrio un error'})}
    
    const {idFuncio,nombreProducto,categoriaProducto,descripcion,precio,unidades} = req.body
    const id = req.params.id
    try {
        await GenProductos.findOneAndUpdate({_id:id},{
            idFuncionario:idFuncio,
            nombreProducto:nombreProducto,
            categoriaProducto:categoriaProducto,
            descripcion:descripcion,
            precio:precio,
            unidades:unidades,
        });
        
        return res.redirect('/api-funcionario/get-products')

    } catch (error) {
        console.log(error)
        return res.render('updateProductFun',{csrfToken:req.csrfToken(),message:"ha ocurrido un error"})
    }
}

//update product method get
OperfuncionarioCtrl.DeleteProduct = async (req, res) => {
    if(!req.body._csrf) {
        res.render('listProducts',{message:'Ocurrio un error'})}

    const id = req.params.id
    await GenProductos.findOneAndUpdate({_id: id},{$set:{estado:"eliminado"}})
    return res.redirect('/api-funcionario/get-products')
}


/*
####################################################################################################
DRONES
####################################################################################################
*/
//get all drones
OperfuncionarioCtrl.GetAllDrones = async (req, res) => {
    const AllDrones = await GenDrones.find({ estado: { $nin: ["eliminado"] } });
    return res.render('listDrones',{csrfToken:req.csrfToken(),message:"",AllDrones:AllDrones})
}

//get unique product
OperfuncionarioCtrl.GetOneDrone = async (req, res) => {
    const id = req.params.id
    const OneDrone = await GenDrones.findOne({_id:id});
    res.json(OneDrone)
}

//create product method get
OperfuncionarioCtrl.CreateDroneGet = async (req, res) => {
    return res.render('addDroneFun',{csrfToken:req.csrfToken(),message:""})
}

//create product method post
OperfuncionarioCtrl.CreateDrone = async (req, res) => {
    if(!req.body._csrf) {
        res.render('addDroneFun',{message:'Ocurrio un error'})}
    
    const {idFuncio,nombreDrone,tipoDrone} = req.body
    try {
        const newDrone = new GenDrones({
            idFuncionario:idFuncio,
            nombreDrone:nombreDrone,
            tipoDrone:tipoDrone
        });
        
        await newDrone.save();
        return res.render('addDroneFun',{csrfToken:req.csrfToken(),message:"drone creado"})

    } catch (error) {
        console.log(error)
        return res.render('addDroneFun',{csrfToken:req.csrfToken(),message:"ha ocurrido un error"})
    }
}

//update product method get
OperfuncionarioCtrl.UpdateDroneGet = async (req, res) => {
    const id = req.params.id
    const DroneUpdate = await GenDrones.findOne({_id:id});
    return res.render('updateDroneFun',{csrfToken:req.csrfToken(),message:"",DroneUpdate:DroneUpdate})
}

//update product method post
OperfuncionarioCtrl.UpdateDrone = async (req, res) => {
    if(!req.body._csrf) {
        res.render('updateDroneFun',{message:'Ocurrio un error'})}
    
    const {idFuncio,nombreDrone,tipoDrone,estado,descripcion} = req.body
    const id = req.params.id
    try {
        await GenDrones.findOneAndUpdate({_id:id},{
            idFuncionario:idFuncio,
            nombreDrone:nombreDrone,
            tipoDrone:tipoDrone,
            estado:estado,
            descripcion:descripcion
        });
        
        return res.redirect('/api-funcionario/get-drones')

    } catch (error) {
        console.log(error)
        return res.render('updateDroneFun',{csrfToken:req.csrfToken(),message:"ha ocurrido un error"})
    }
}

//update product method get
OperfuncionarioCtrl.DeleteDrone = async (req, res) => {
    if(!req.body._csrf) {
        res.render('listDrones',{message:'Ocurrio un error'})}

    const id = req.params.id
    await GenDrones.findOneAndUpdate({_id: id},{$set:{estado:"eliminado"}})
    return res.redirect('/api-funcionario/get-drones')
}


module.exports = OperfuncionarioCtrl;
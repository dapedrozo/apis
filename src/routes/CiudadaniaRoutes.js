const {Router} = require('express');
const router = Router();
const ciudadaniaCtrl = require('../controllers/CiudadaniaController');
const operacionesCiudadaniaCtrl = require('../controllers/OperacionesCiudadania');

//rutas informacion general ciudadania
router.route('/get-ciudadania')
    .get(ciudadaniaCtrl.AllUsersCiudadania)

router.route('/signUp-ciudadania')
    .get(ciudadaniaCtrl.signUpCiudadanoTemplate)    
    .post(ciudadaniaCtrl.signUpCiudadano)

router.route('/signIn-ciudadania')
    .get(ciudadaniaCtrl.signInCiudadanoTemplate)
    .post(ciudadaniaCtrl.signInCiudadano)

router.route('/delete-persona/:id')
    .delete(ciudadaniaCtrl.DeleteUser)

//rutas funcionalidad ciudadania
router.route('/create-carrito')
    .get(operacionesCiudadaniaCtrl.GetCarritos)
    .post(operacionesCiudadaniaCtrl.CreateCarrito)

router.route('/get-products-ciudadania')
    .get(operacionesCiudadaniaCtrl.GetAllProducts)
    .post(operacionesCiudadaniaCtrl.CreateProductoCarrito)

router.route('/preCarrito')
    .get(operacionesCiudadaniaCtrl.GetAllProductsCarrito)
    .post(operacionesCiudadaniaCtrl.CreateFacturaCarrito)

router.route('/del-prod-select/:id')
    .post(operacionesCiudadaniaCtrl.deleteProductCarrito)

module.exports = router;
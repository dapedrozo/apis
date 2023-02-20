const {Router} = require('express');
const router = Router();
const funcionarioCtrl = require('../controllers/FuncionarioController');
const OperfuncionarioCtrl = require('../controllers/OperacionesFuncionario');

//rutas funcionarios (como usuarios)
router.route('/get-funcionarios')
    .get(funcionarioCtrl.AllUsersFuncionario)

router.route('/signUp-funcionarios')
    .get(funcionarioCtrl.signUpFuncionarioTemplate)    
    .post(funcionarioCtrl.signUpFuncionario)

router.route('/signIn-funcionarios')
    .get(funcionarioCtrl.signInFuncionarioTemplate)
    .post(funcionarioCtrl.signInFuncionario)

router.route('/delete-funcionario/:id')
    .delete(funcionarioCtrl.DeleteFuncionario)

router.route('/dashboard')
    .get(funcionarioCtrl.Dashboard)

//rutas funcionarios (manejo de productos)
router.route('/get-products')
    .get(OperfuncionarioCtrl.GetAllProducts)

router.route('/get-product/:id')
    .get(OperfuncionarioCtrl.GetOneProduct)

router.route('/create-product')
    .get(OperfuncionarioCtrl.CreateProductGet)
    .post(OperfuncionarioCtrl.CreateProduct)

router.route('/update-product/:id')
    .get(OperfuncionarioCtrl.UpdateProductGet)
    .post(OperfuncionarioCtrl.UpdateProduct)

router.route('/delete-product/:id')
    .post(OperfuncionarioCtrl.DeleteProduct)


//rutas funcionarios (manejo de drones)
router.route('/get-drones')
    .get(OperfuncionarioCtrl.GetAllDrones)

router.route('/get-drone/:id')
    .get(OperfuncionarioCtrl.GetOneDrone)

router.route('/create-drone')
    .get(OperfuncionarioCtrl.CreateDroneGet)
    .post(OperfuncionarioCtrl.CreateDrone)

router.route('/update-drone/:id')
    .get(OperfuncionarioCtrl.UpdateDroneGet)
    .post(OperfuncionarioCtrl.UpdateDrone)

router.route('/delete-drone/:id')
    .post(OperfuncionarioCtrl.DeleteDrone)

module.exports = router;
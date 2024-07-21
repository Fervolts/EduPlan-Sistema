const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddlewares');

router.use(authenticateToken);

//RECORDATORIOS


//
const authController = require('../controllers/AuthController');
router.post('/api/register', authController.register);
router.post('/api/login', authController.login);



//
const {getAllEstudi, getByIdEstudi, createEstudi, updateEstudi, deleteEstudi} = require('../controllers/estudianteController');

router.get('/listEstudiantes', getAllEstudi); //
router.get('/:id', getByIdEstudi);
router.post('/createEstu', createEstudi);
router.put('/:id', updateEstudi);
router.delete('/:id', deleteEstudi);

//Profesor
const {getAllProf, getByIdProf, createProf, updateProf, deleteProf} = require('../controllers/profesorController');

router.get('/listoProfesor', getAllProf);
router.get('/:id', getByIdProf);
router.post('/createProf', createProf);
router.put('/:id', updateProf);
router.delete('/:id', deleteProf);

//Materias

const {getAllMate,getByIdMate,createMate,deleteMate,updateMate} = require('../controllers/materiasController');

router.get('/listMaterias', getAllMate);
router.get('/:id', getByIdMate);
router.post('/createMate', createMate);
router.put('/:id', updateMate);
router.delete('/:id', deleteMate);

//
const {getAllAdmin, getByIdAdmin, createAdmin, updateAdmin, deleteAdmin} = require('../controllers/administradorController');

router.get('/listAdmin', getAllAdmin);
router.get('/:id', getByIdAdmin);
router.post('/createAdmin', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

//
const {getAllEva, getByIdEva, createEva, updateEva, deleteEva} = require('../controllers/evaluacionesController');

router.get('/listEvaluacion', getAllEva);
router.get('/:id', getByIdEva);
router.post('/createEva', createEva);
router.put('/:id', updateEva);
router.delete('/:id', deleteEva);

//
const {getAllIns, getByIdIns, createIns, deleteIns} = require('../controllers/inscripcionesController');

router.get('/listInscripciones', getAllIns);
router.get('/:id', getByIdIns);
router.post('/createIns', createIns);
router.delete('/:id', deleteIns);

//
const {getAllimp, getByIdimp, createimp, deleteimp} = require('../controllers/imparteController');

router.get('/listImparte', getAllimp);
router.get('/:id', getByIdimp);
router.post('/createimp', createimp);
router.delete('/:id', deleteimp);

// --
const {getAllRol, getByIdRol, createRol, updateRol, deleteRol} = require('../controllers/rolesController');

router.get('/listRol', getAllRol);
router.get('/:id', getByIdRol);
router.post('/createRol',createRol);
router.put('/:id', updateRol);
router.delete('/:id', deleteRol);

//
const {getAllUser, getByIdUser, createUser, deleteUser} = require('../controllers/usuariosRolesController');

router.get('/listUserRol', getAllUser);
router.get('/:id', getByIdUser);
router.post('/createUser', createUser);
router.delete('/:id', deleteUser);

module.exports = router;
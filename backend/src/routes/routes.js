const express = require('express');
const router = express.Router();

// Importar los controladores
const {loginEstudiante, loginProfesor, loginAdministrador} = require('../controllers/AuthController');
const {createEstudiante, getEstudiantes} = require('../controllers/estudianteController');
const {createProfesor, getProfesores} = require('../controllers/profesorController');
const {createMateria, getMaterias} = require('../controllers/materiaController');
const {createAdministrador} = require('../controllers/administradorController');
const {createEvaluacion, getEvaluaciones} = require('../controllers/evaluacionController');
const {createInscripcion, getInscripciones} = require('../controllers/inscripcionController');
const {createImparte, getImparte} = require('../controllers/imparteController');
const {createRol, getRoles} = require('../controllers/rolController');
const {createUsuarioRol, getUsuariosRoles} = require('../controllers/usuarioRolController');

// Importar middleware
const authenticateToken = require('../middlewares/authMiddleware');

// Rutas para autenticación
router.post('/login/estudiante', loginEstudiante);
router.post('/login/profesor', loginProfesor);
router.post('/login/administrador', loginAdministrador);

// Rutas para registro
router.post('/register/estudiante', createEstudiante);
router.post('/register/profesor', createProfesor);
router.post('/register/administrador', createAdministrador);

// Rutas protegidas para estudiantes
router.use('/estudiantes', authenticateToken);
router.get('/estudiantes', getEstudiantes);

// Rutas protegidas para profesores
router.use('/profesores', authenticateToken)
router.get('/profesores', getProfesores);

// Rutas para materias
router.post('/materias', authenticateToken, createMateria);
router.get('/materias', getMaterias)

// Rutas para evaluaciones
router.post('/evaluaciones/agg', authenticateToken, createEvaluacion);
router.get('/evaluaciones', getEvaluaciones);

// Rutas para inscripciones
router.post('/inscripciones', authenticateToken, createInscripcion);
router.get('/inscripciones', authenticateToken, getInscripciones);

// Rutas para imparte (Profesor - Materia)
router.post('/imparte', authenticateToken, createImparte);
router.get('/imparte', authenticateToken, getImparte);

// Rutas para roles
router.post('/roles', authenticateToken, createRol);
router.get('/roles', authenticateToken, getRoles);

// Rutas para usuarios_roles
router.post('/usuarios_roles', authenticateToken, createUsuarioRol);
router.get('/usuarios_roles', authenticateToken, getUsuariosRoles);

module.exports = router;

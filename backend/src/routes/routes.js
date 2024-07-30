const express = require('express');
const router = express.Router();

// Importar los controladores
const {loginEstudiante, loginProfesor, loginAdministrador} = require('../controllers/AuthController');
const {createEstudiante, getEstudiantes, deleteEstudiante, asignarMateriasEstu, obtenerMateriasEstu} = require('../controllers/estudianteController');
const {createProfesor, getProfesores, deleteProfesor} = require('../controllers/profesorController');
const {createMateria, getMaterias} = require('../controllers/materiaController');
const {createAdministrador, deleteAdministrador, getAdministradores} = require('../controllers/administradorController');
const {createEvaluacion, getEvaluaciones, deleteEvaluacion, updateEvaluacion, uploadEvaluacion, exportarNotasPDF } = require('../controllers/evaluacionController');
const {createInscripcion, getInscripciones} = require('../controllers/inscripcionController');
const {createImparte, getImparte} = require('../controllers/imparteController');
const {createRol, getRoles} = require('../controllers/rolController');
const {createUsuarioRol, getUsuariosRoles} = require('../controllers/usuarioRolController');
const {createNoticia, getNoticiaById, getAllNoticias, updateNoticia, deleteNoticia} = require('../controllers/NoticiaController');

// Importar middleware
const {authenticateToken} = require('../middlewares/authMiddleware');


// const { generatePDF } = require('../controllers/PDFController');




//Rutas de noticias
router.get('/noticias', getAllNoticias);
router.get('/noticias/:id', getNoticiaById);
router.post('/noticias', createNoticia);
router.put('/noticias/:id', updateNoticia);
router.delete('/noticias/:id', deleteNoticia);

// Rutas para autenticación
router.post('/login/estudiante', loginEstudiante);
router.post('/login/profesor', loginProfesor);
router.post('/login/administrador', loginAdministrador);

//Rutas de admin
router.use('/administradores', authenticateToken)
router.get('/administradores', getAdministradores)
router.delete('/administradores/:id', deleteAdministrador);


// Rutas para registro
router.post('/register/estudiante', createEstudiante);
router.post('/register/profesor', createProfesor);
router.post('/register/administrador', createAdministrador);

// Rutas protegidas para estudiantes
router.use('/estudiantes', authenticateToken);
router.get('/estudiantes', getEstudiantes);
router.delete('/estudiantes/:id', deleteEstudiante);

// Rutas protegidas para profesores
router.use('/profesores', authenticateToken)
router.get('/profesores', getProfesores);
router.delete('/profesores/:id', deleteProfesor);

// Rutas para materias
router.post('/materias', authenticateToken, createMateria);
router.get('/materias', getMaterias)

// Rutas para evaluaciones
router.post('/evaluaciones/agg', authenticateToken, createEvaluacion);
router.get('/evaluaciones', getEvaluaciones);
router.put('/evaluaciones/:id', updateEvaluacion); 
router.delete('/evaluaciones/:id', deleteEvaluacion); 
router.post('/evaluaciones/:id_evaluacion',uploadEvaluacion);
router.get('/evaluaciones/exportar-notas/:id_materia',authenticateToken, exportarNotasPDF); 

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

//Agregando nuevos controladores a la ruta general

const {asignarMaterias, obtenerMaterias} = require('../controllers/ProfesorMateriaController');

router.post('/profesor/:id/materias', asignarMaterias);
router.get('/profesor/:id/materias', obtenerMaterias);

//

router.post('/estudiante/:id/materias', asignarMateriasEstu);
router.get('/estudiante/:id/materias', obtenerMateriasEstu);

module.exports = router;

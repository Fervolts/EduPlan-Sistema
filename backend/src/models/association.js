const Evaluacion = require('./Evaluacion');
const Materia = require('./Materia');
const Estudiante = require('./Estudiante');
const Profesor = require('./Profesor')

// Asociación entre Materia y Evaluacion
Materia.hasMany(Evaluacion, { foreignKey: 'id_materia' });
Evaluacion.belongsTo(Materia, { foreignKey: 'id_materia' });

// Asociación entre Estudiante y Evaluacion (a través de la tabla intermedia)
Estudiante.belongsToMany(Evaluacion, { through: 'EvaluacionEstudiante', foreignKey: 'id_estudiante' });
Evaluacion.belongsToMany(Estudiante, { through: 'EvaluacionEstudiante', foreignKey: 'id_evaluacion' });

// Modelo Profesor
Profesor.belongsToMany(Materia, { through: 'ProfesorMateria', foreignKey: 'id_profesor' });

// Modelo Materia
Materia.belongsToMany(Profesor, { through: 'ProfesorMateria', foreignKey: 'id_materia' });

Materia.belongsToMany(Estudiante, { through: 'EstudianteMateria', foreignKey: 'id_materia' });
Estudiante.belongsToMany(Materia, { through: 'EstudianteMateria', foreignKey: 'id_estudiante' });


const Evaluacion = require('./Evaluacion');
const Materia = require('./Materia');
const Estudiante = require('./Estudiante');


// Asociación entre Materia y Evaluacion
Materia.hasMany(Evaluacion, { foreignKey: 'id_materia' });
Evaluacion.belongsTo(Materia, { foreignKey: 'id_materia' });

// Asociación entre Estudiante y Evaluacion (a través de la tabla intermedia)
Estudiante.belongsToMany(Evaluacion, { through: 'EvaluacionEstudiante', foreignKey: 'id_estudiante' });
Evaluacion.belongsToMany(Estudiante, { through: 'EvaluacionEstudiante', foreignKey: 'id_evaluacion' });


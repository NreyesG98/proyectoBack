import Alumno from '../models/alumno.model.js';

// Listar todos los alumnos
export const getAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo alumnos', error });
  }
};

// Crear un nuevo alumno
export const createAlumno = async (req, res) => {
  const { nombre_alum, apellido_alum, fecha_nacimiento_alum, id_curso } = req.body;

  // Validar los datos de entrada
  if (!nombre_alum || !apellido_alum || !fecha_nacimiento_alum || !id_curso) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const alumno = await Alumno.create({ nombre_alum, apellido_alum, fecha_nacimiento_alum, id_curso });
    res.status(201).json({ message: 'Alumno creado exitosamente', alumno });
  } catch (error) {
    res.status(500).json({ message: 'Error creando el alumno', error: error.message });
  }
};

// Obtener un alumno por ID
export const findAlumno = async (req, res) => {
  const { id } = req.params;
  try {
    const alumno = await Alumno.findOne({ where: { id_alum: id } });
    if (alumno) {
      res.json(alumno);
    } else {
      res.status(404).json({ message: 'Alumno no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo el alumno', error });
  }
};

// Actualizar un alumno
export const updateAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre_alum, apellido_alum, fecha_nacimiento_alum, id_curso } = req.body;

  try {
    const alumno = await Alumno.findOne({ where: { id_alum: id } });
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    alumno.nombre_alum = nombre_alum || alumno.nombre_alum;
    alumno.apellido_alum = apellido_alum || alumno.apellido_alum;
    alumno.fecha_nacimiento_alum = fecha_nacimiento_alum || alumno.fecha_nacimiento_alum;
    alumno.id_curso = id_curso || alumno.id_curso;

    await alumno.save();
    res.json({ message: 'Alumno actualizado exitosamente', alumno });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el alumno', error: error.message });
  }
};

// Eliminar un alumno
export const deleteAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const alumno = await Alumno.findOne({ where: { id_alum: id } });
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    await alumno.destroy();
    res.json({ message: 'Alumno eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando el alumno', error: error.message });
  }
};
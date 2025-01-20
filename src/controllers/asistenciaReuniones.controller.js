import AsistenciaReuniones from '../models/asistenciaReuniones.model.js';

// Listar todas las asistencias
export const getAsistencias = async (req, res) => {
  try {
    const asistencias = await AsistenciaReuniones.findAll();
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo asistencias', error });
  }
};

// Crear una nueva asistencia
export const createAsistencia = async (req, res) => {
  const { id_reunion, id_apoderado, asistio, observaciones } = req.body;

  // Validar los datos de entrada
  if (!id_reunion || !id_apoderado) {
    return res.status(400).json({ message: 'Los campos id_reunion y id_apoderado son obligatorios' });
  }

  try {
    const asistencia = await AsistenciaReuniones.create({ id_reunion, id_apoderado, asistio, observaciones });
    res.status(201).json({ message: 'Asistencia creada exitosamente', asistencia });
  } catch (error) {
    res.status(500).json({ message: 'Error creando la asistencia', error: error.message });
  }
};

// Obtener una asistencia por ID
export const findAsistencia = async (req, res) => {
  const { id } = req.params;
  try {
    const asistencia = await AsistenciaReuniones.findOne({ where: { id_asistencia: id } });
    if (asistencia) {
      res.json(asistencia);
    } else {
      res.status(404).json({ message: 'Asistencia no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo la asistencia', error });
  }
};

// Actualizar una asistencia
export const updateAsistencia = async (req, res) => {
  const { id } = req.params;
  const { id_reunion, id_apoderado, asistio, observaciones } = req.body;

  try {
    const asistencia = await AsistenciaReuniones.findOne({ where: { id_asistencia: id } });
    if (!asistencia) {
      return res.status(404).json({ message: 'Asistencia no encontrada' });
    }

    asistencia.id_reunion = id_reunion || asistencia.id_reunion;
    asistencia.id_apoderado = id_apoderado || asistencia.id_apoderado;
    asistencia.asistio = asistio !== undefined ? asistio : asistencia.asistio;
    asistencia.observaciones = observaciones || asistencia.observaciones;

    await asistencia.save();
    res.json({ message: 'Asistencia actualizada exitosamente', asistencia });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando la asistencia', error: error.message });
  }
};

// Eliminar una asistencia
export const deleteAsistencia = async (req, res) => {
  const { id } = req.params;

  try {
    const asistencia = await AsistenciaReuniones.findOne({ where: { id_asistencia: id } });
    if (!asistencia) {
      return res.status(404).json({ message: 'Asistencia no encontrada' });
    }

    await asistencia.destroy();
    res.json({ message: 'Asistencia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando la asistencia', error: error.message });
  }
};
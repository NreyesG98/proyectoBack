// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/controllers/reunion.controllers.js
import sequelize from '../db.js';// Asegúrate de que la ruta sea correcta
import Reunion from '../models/reunion.model.js';


export const getCursos = async (req, res) => {
    try {
      const [results, metadata] = await sequelize.query('SELECT * FROM cursos');
      console.log('Obteniendo datos de cursos: ', results);
      res.json(results);
    } catch (error) {
      console.error('Error obteniendo datos de cursos: ', error);
      res.status(500).send('Error obteniendo datos de cursos');
    }
  };

export const getReuniones = async (req, res) => {
  try {
    const reuniones = await Reunion.findAll();
    console.log('Obteniendo datos de reuniones: ', reuniones);
    res.json(reuniones);
  } catch (error) {
    console.error('Error obteniendo datos de reuniones: ', error);
    res.status(500).send('Error obteniendo datos de reuniones');
  }
};

export const createReunion = async (req, res) => {
  const { fecha_reu, hora_reu, lugar_reu, tema_reu, id_curso } = req.body;
  try {
    const reunion = await Reunion.create({ fecha_reu, hora_reu, lugar_reu, tema_reu, id_curso });
    console.log('Reunión creada: ', reunion);
    res.status(201).json({ message: 'Reunión creada exitosamente', reunion });
  } catch (error) {
    console.error('Error creando la reunión: ', error);
    res.status(500).json({ message: 'Error creando la reunión', error: error.message });
  }
};

export const findReunion = async (req, res) => {
  const { id } = req.params;
  try {
    const reunion = await Reunion.findOne({ where: { id_reunion: id } });
    if (reunion) {
      console.log('Reunión encontrada: ', reunion);
      res.json(reunion);
    } else {
      res.status(404).send('Reunión no encontrada');
    }
  } catch (error) {
    console.error('Error obteniendo la reunión: ', error);
    res.status(500).send('Error obteniendo la reunión');
  }
};

export const deleteReunion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Reunion.destroy({ where: { id_reunion: id } });
    if (result) {
      console.log('Reunión eliminada');
      res.status(200).send('Reunión eliminada');
    } else {
      res.status(404).send('Reunión no encontrada');
    }
  } catch (error) {
    console.error('Error eliminando la reunión: ', error);
    res.status(500).send('Error eliminando la reunión');
  }
};

export const updateReunion = async (req, res) => {
  const { id } = req.params;
  const { fecha_reu, hora_reu, lugar_reu, tema_reu, id_curso } = req.body;
  try {
    const reunion = await Reunion.findOne({ where: { id_reunion: id } });
    if (reunion) {
      reunion.fecha_reu = fecha_reu;
      reunion.hora_reu = hora_reu;
      reunion.lugar_reu = lugar_reu;
      reunion.tema_reu = tema_reu;
      reunion.id_curso = id_curso;
      await reunion.save();
      console.log('Reunión actualizada: ', reunion);
      res.status(200).json({ message: 'Reunión actualizada exitosamente', reunion });
    } else {
      res.status(404).send('Reunión no encontrada');
    }
  } catch (error) {
    console.error('Error actualizando la reunión: ', error);
    res.status(500).send('Error actualizando la reunión');
  }
};
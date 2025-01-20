import sequelize from '../db.js';// Asegúrate de que la ruta sea correcta
import Pago from '../models/pagos.model.js';

export const getPagos = async (req, res) => {
  try {
    const pagos = await Pago.findAll();
    console.log('Obteniendo datos de pagos: ', pagos);
    res.json(pagos);
  } catch (error) {
    console.error('Error obteniendo datos de pagos: ', error);
    res.status(500).send('Error obteniendo datos de pagos');
  }
};

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

//..............................................................//

export const createPago = async (req, res) => {
  const { fecha_pago, monto, estado_pago, id_apoderado } = req.body;

  // Validar los datos de entrada
  if (!fecha_pago || !monto || !estado_pago || !id_apoderado) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const pago = await Pago.create({ fecha_pago, monto, estado_pago, id_apoderado });
    console.log('Pago creado: ', pago);
    res.status(201).json({ message: 'Pago creado exitosamente', pago });
  } catch (error) {
    console.error('Error creando el pago: ', error);
    res.status(500).json({ message: 'Error creando el pago', error: error.message });
  }
};

export const findPago = async (req, res) => {
  const { id } = req.params;
  try {
    const pago = await Pago.findOne({ where: { id_pago: id } });
    if (pago) {
      console.log('Pago encontrado: ', pago);
      res.json(pago);
    } else {
      res.status(404).send('Pago no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo el pago: ', error);
    res.status(500).send('Error obteniendo el pago');
  }
};


export const deletePago = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Pago.destroy({ where: { id_pago: id } });
    if (result) {
      console.log('Pago eliminado');
      res.status(200).send('Pago eliminado');
    } else {
      res.status(404).send('Pago no encontrado');
    }
  } catch (error) {
    console.error('Error eliminando el pago: ', error);
    res.status(500).send('Error eliminando el pago');
  }
};

export const updatePago = async (req, res) => {
  const { id } = req.params;
  const { fecha_pago, monto, estado_pago, id_apoderado } = req.body;
  try {
    const pago = await Pago.findOne({ where: { id_pago: id } });
    if (pago) {
      pago.fecha_pago = fecha_pago;
      pago.monto = monto;
      pago.estado_pago = estado_pago;
      pago.id_apoderado = id_apoderado;
      await pago.save();
      console.log('Pago actualizado: ', pago);
      res.status(200).json({ message: 'Pago actualizado exitosamente', pago });
    } else {
      res.status(404).send('Pago no encontrado');
    }
  } catch (error) {
    console.error('Error actualizando el pago: ', error);
    res.status(500).send('Error actualizando el pago');
  }
};
  
  
import RegistroPagosReuniones from '../models/registroPagosReuniones.model.js';

// Listar todos los registros de pagos
export const getRegistrosPagos = async (req, res) => {
  try {
    const registros = await RegistroPagosReuniones.findAll();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo registros de pagos', error });
  }
};

// Crear un nuevo registro de pago
export const createRegistroPago = async (req, res) => {
  const { id_reunion, id_apoderado, pago_completo } = req.body;

  // Validar los datos de entrada
  if (!id_reunion || !id_apoderado) {
    return res.status(400).json({ message: 'Los campos id_reunion y id_apoderado son obligatorios' });
  }

  try {
    const registro = await RegistroPagosReuniones.create({ id_reunion, id_apoderado, pago_completo });
    res.status(201).json({ message: 'Registro de pago creado exitosamente', registro });
  } catch (error) {
    res.status(500).json({ message: 'Error creando el registro de pago', error: error.message });
  }
};

// Obtener un registro de pago por ID
export const findRegistroPago = async (req, res) => {
  const { id } = req.params;
  try {
    const registro = await RegistroPagosReuniones.findOne({ where: { id_registro: id } });
    if (registro) {
      res.json(registro);
    } else {
      res.status(404).json({ message: 'Registro de pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo el registro de pago', error });
  }
};

// Actualizar un registro de pago
export const updateRegistroPago = async (req, res) => {
  const { id } = req.params;
  const { id_reunion, id_apoderado, pago_completo } = req.body;

  try {
    const registro = await RegistroPagosReuniones.findOne({ where: { id_registro: id } });
    if (!registro) {
      return res.status(404).json({ message: 'Registro de pago no encontrado' });
    }

    registro.id_reunion = id_reunion || registro.id_reunion;
    registro.id_apoderado = id_apoderado || registro.id_apoderado;
    registro.pago_completo = pago_completo !== undefined ? pago_completo : registro.pago_completo;

    await registro.save();
    res.json({ message: 'Registro de pago actualizado exitosamente', registro });
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el registro de pago', error: error.message });
  }
};

// Eliminar un registro de pago
export const deleteRegistroPago = async (req, res) => {
  const { id } = req.params;

  try {
    const registro = await RegistroPagosReuniones.findOne({ where: { id_registro: id } });
    if (!registro) {
      return res.status(404).json({ message: 'Registro de pago no encontrado' });
    }

    await registro.destroy();
    res.json({ message: 'Registro de pago eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando el registro de pago', error: error.message });
  }
};
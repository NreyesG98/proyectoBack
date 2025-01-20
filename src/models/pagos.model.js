// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/models/pago.model.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Asegúrate de que la ruta sea correcta

const Pago = sequelize.define('Pago', {
  id_pago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  monto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado_pago: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Pagado', 'Pendiente']],
    },
  },
  id_apoderado: {
    type: DataTypes.INTEGER,
    references: {
      model: 'apoderados',
      key: 'id_apoderado',
    },
  },
}, {
  tableName: 'pagos_mensualidad',
  timestamps: false,
});

export default Pago;
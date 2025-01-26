import { Sequelize } from 'sequelize';
import { DB_HOST,DB_USER,DB_PASS,DB_NAME} from './config.js';

const sequelize = new Sequelize(process.env.DB_NAME, proccess.env.DB_USER, proccess.env.DB_PASS, {
  host: proccess.env.DB_HOST,
  port: 5432,
  dialect: 'postgres',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export default sequelize;

// // ! Nombre db: colegioDB
// import pg from 'pg'

// export const pool = new pg.Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'colegioDB',  // or Minus 'colegiodb'
//   password: 'Flor2020.',
//   port: 5432,
// })

// pool.query('SELECT NOW()').then(result => {
//   console.log('DB connected:', result.rows[0].now)
// })
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('colegioDB', 'postgres', 'Flor2020.', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Asegúrate de que este sea el puerto correcto
  logging: false, // Puedes habilitar o deshabilitar el logging
});

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
// ! Nombre db: colegioDB
import pg from 'pg'

export const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'colegiodb',  // or Minus 'colegiodb'
  password: '123456',
  port: 5432,
})

pool.query('SELECT NOW()').then(result => {
  console.log('DB connected:', result.rows[0].now)
})
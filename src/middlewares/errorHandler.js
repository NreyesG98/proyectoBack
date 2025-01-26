// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor 4', error: err.message,
      db_credentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
     });
  };
  
  export default errorHandler;
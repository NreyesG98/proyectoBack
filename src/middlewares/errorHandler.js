// filepath: /c:/Users/martin/Desktop/ProyectoFinal/src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message });
  };
  
  export default errorHandler;
const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;

const connectDb = async ()=> {
    try {
        await mongoose.connect(DB_URL);
        console.log('La conexion a la base de datos se ha realizado correctamente');
    }catch(error){
        console.error('La conexion a la base de datos ha sufrido un error' + error.message);
        process.exit(1);
    }
}

module.exports = connectDb;
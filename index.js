const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.SECRET_KEY;


//Middlewares
app.use(cors());
app.use(express.json());

//Conectar a la base de datos en MongoDB
connectDb();

//Rutas
app.use('/api', taskRoutes);
app.use('/api', authRoutes);

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto '+ PORT  );
})
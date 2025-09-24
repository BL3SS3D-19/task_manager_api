
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;


//Registrar a un Usuario
exports.register = async (req, res)=>{
    try{
        const {email, password} = req.body;

        //Validar Usuario existente
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'El Usuario ya existe'});

        //Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Crear Usuario
        const newUser = new User({email, password: hashedPassword});
        await newUser.save();

        //Confirmacion del proceso
        res.status(200).json({message: 'Usuario registrado correctamente'});
    }catch(error){
        res.status(500).json({message: 'Error en el servidor', error})
    }
};

//Login del Usuario
exports.login = async (req, res)=>{
    try{
        const{email, password} = req.body

        //Verificar existencia del usuario
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Creedenciales invalidas'});

        //Verificar contraseña
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched) return res.status(400).json({message: 'Las creedenciales no son correctas'})
        
        //Generar token
        const token = jwt.sign(
            {userId: user._id, email: user.email},
            SECRET_KEY,
            {expiresIn: '1h'}
        );
        res.json({token})

    }catch(error){
        res.status(500).json({message: 'Error interno del servidor', error : error.message});
    }
}
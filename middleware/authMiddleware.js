const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: 'Acceso Denegado. Token requerido'})
    }

    try{
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; //Guardamos info de usuario en la request
        next();
    }catch(error){
        res.status(401).json({message: 'Token invalido o expirado', error: error.message});
    }
}
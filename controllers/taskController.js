const Task = require('../models/Task');
const mongoose = require('mongoose');


//Obtener todas las tareas
const getTasks = async (req, res)=> {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//Obtener una tarea por id como parametro
const getTaskById = async (req, res)=> {
    
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'ID invalido'});
    }

    try{
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(500).json({message: 'Tarea no encontrada'}) 
            res.json(task);
    }catch (error) {
        res.status(404).json({message: error.message})
    }
};

//Crear una tarea
const createTask = async(req, res)=>{
    try{
        const{title, description, deadLine, status} = req.body;
        const newTask = new Task({title, description, deadLine, status});
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

const updateTask = async(req, res)=> {
    try{
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );
        if (!updatedTask) res.status(404).json({message: 'Tarea no encontrada'});
        res.json(updatedTask);
    }catch(error){
            res.status(400).json({message: error.message})
    }
};

const deleteTask = async(req, res)=>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask) res.status(404).json({message: 'Tarea no encontrada'})
        res.json({message: 'Tarea eliminada correctamente'})
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};

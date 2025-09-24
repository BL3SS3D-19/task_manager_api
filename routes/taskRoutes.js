const express = require('express');
const router = express.Router();
const{
    getTasks,
    getTaskById,
    updateTask, 
    createTask,
    deleteTask
} = require('../controllers/taskController');

const auth = require('../middleware/authMiddleware')

//Rutas protegidas con JWT
router.get('/tasks',auth, getTasks);
router.post('/task', auth, createTask);
//Rutas publicas
router.put('/task/:id', auth,  updateTask);
router.get('/task/:id', auth, getTaskById);
router.delete('/task/:id', auth, deleteTask);

module.exports = router;
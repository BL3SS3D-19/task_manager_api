const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, required : true},
    description : { type: String},
    dateCreated : { type: Date, default: Date.now},
    deadLine: { type: Date},
    status : { type: Boolean, default: false}
});

module.exports = mongoose.model('Task' ,taskSchema, 'task_collection');
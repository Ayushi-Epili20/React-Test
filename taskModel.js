const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: String,
    assignedTo: String,
    category: String,
    priority: String,
    dueDate: Date,
    status: String,
    attachment: String

}, {
    timestamps: true
})

const taskModel = mongoose.model('tasks', taskSchema)

module.exports = taskModel

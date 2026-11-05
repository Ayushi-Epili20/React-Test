const taskModel = require('../models/taskModel');


exports.addTask = async (req, res) => {
    const new_task = new taskModel({ ...req.body })
    if (req.file) {
        new_task.attachment = req.file.filename
    }
    const result = await new_task.save()
    res.status(200).json(result)
}

exports.showTasks = async (req, res) => {
    const tasks = await taskModel.find()
    if (tasks != null) {
        res.status(200).json(tasks)
    } else {
        res.status(404).json({ 'message': 'No Tasks' })
    }
}

exports.showTask = async (req, res) => {
    const task = await taskModel.findById(req.params.id)
    if (task != null) {
        res.status(200).json(task)
    } else {
        res.status(404).json({ message: 'not record found' })
    }
}

exports.updateTask = async (req, res) => {
   const data = { ...req.body }
   // if new file is uploaded then change it, otherwise old attachment stays
   if (req.file) {
       data.attachment = req.file.filename
   }
   const task = await taskModel.findByIdAndUpdate(req.params.id,data)
   res.status(200).json({message : 'task updated successfully...'})
}

exports.delTask = async (req, res) => {
    const task = await taskModel.findByIdAndDelete(req.params.id)
    if (task != null) {
        res.status(200).json({ message: 'Task deleted successfully...' })
    } else {
        res.status(404).json({ message: 'Task not found...' })
    }
}

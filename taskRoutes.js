const express = require('express');
const { addTask, showTasks, updateTask, showTask, delTask } = require('../controllers/taskController');
const upload = require('../middleware/upload');

const routes = express.Router()

routes.post('/add',upload.single('attachment'),addTask)
routes.get('/',showTasks)
routes.put('/:id',upload.single('attachment'),updateTask)
routes.get('/task/:id',showTask)
routes.delete('/:id',delTask)

module.exports = routes

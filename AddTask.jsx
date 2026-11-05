import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
    const [task, setTask] = useState({taskName:'',assignedTo:'',category:'',priority:'Low',dueDate:'',status:'Pending'})
    const [attachment, setAttachment] = useState(null)
    const [preview, setPreview] = useState('')
    const navigate = useNavigate()

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAttachment(file)
            // preview only for images
            if (file.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(file))
            } else {
                setPreview('')
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // file is also sent so formdata is used instead of normal object
        const data = new FormData()
        data.append('taskName', task.taskName)
        data.append('assignedTo', task.assignedTo)
        data.append('category', task.category)
        data.append('priority', task.priority)
        data.append('dueDate', task.dueDate)
        data.append('status', task.status)
        if (attachment) {
            data.append('attachment', attachment)
        }

        axios.post('http://localhost:4000/task/add', data)
        .then(() => navigate('/'))
        .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Add Task</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="taskName"
                                            placeholder=""
                                            required
                                            onChange={(e) => setTask({...task, taskName: e.target.value})}
                                        />
                                        <label htmlFor="taskName">Task Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="assignedTo"
                                            placeholder=""
                                            required
                                            onChange={(e) => setTask({...task, assignedTo: e.target.value})}
                                        />
                                        <label htmlFor="assignedTo">Assigned To</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="category"
                                            placeholder=""
                                            required
                                            onChange={(e) => setTask({...task, category: e.target.value})}
                                        />
                                        <label htmlFor="category">Category</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            id="priority"
                                            value={task.priority}
                                            onChange={(e) => setTask({...task, priority: e.target.value})}
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                        <label htmlFor="priority">Priority</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dueDate"
                                            placeholder=""
                                            required
                                            onChange={(e) => setTask({...task, dueDate: e.target.value})}
                                        />
                                        <label htmlFor="dueDate">Due Date</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            id="status"
                                            value={task.status}
                                            onChange={(e) => setTask({...task, status: e.target.value})}
                                        >
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                        <label htmlFor="status">Status</label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="attachment" className="form-label">Task Attachment</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="attachment"
                                            onChange={handleFile}
                                        />
                                    </div>
                                    {
                                        preview && <img src={preview} alt="preview" className="img-thumbnail mb-3" width="200" />
                                    }
                                    {
                                        attachment && !preview && <p className="text-muted">Selected file: {attachment.name}</p>
                                    }
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Add Task
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTask

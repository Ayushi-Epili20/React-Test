import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTask = () => {
    const [task, setTask] = useState({ taskName: '', assignedTo: '', category: '', priority: 'Low', dueDate: '', status: 'Pending', attachment: '' })
    const [newAttachment, setNewAttachment] = useState(null)
    const [preview, setPreview] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/task/task/${id}`)
            .then((res) => {
                // date input needs yyyy-mm-dd format
                setTask({ ...res.data, dueDate: res.data.dueDate.substring(0, 10) })
            })
            .catch((err) => console.log(err))
    }, [])

    const isImage = (file) => /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file)

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNewAttachment(file)
            if (file.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(file))
            } else {
                setPreview('')
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('taskName', task.taskName)
        data.append('assignedTo', task.assignedTo)
        data.append('category', task.category)
        data.append('priority', task.priority)
        data.append('dueDate', task.dueDate)
        data.append('status', task.status)
        // file is added only when user selects new file, else old one is kept
        if (newAttachment) {
            data.append('attachment', newAttachment)
        }

        axios.put(`http://localhost:4000/task/${id}`, data)
            .then(() => navigate('/'))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Edit Task</h4>
                                <form onSubmit={ handleSubmit }>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="taskName"
                                            placeholder=""
                                            required
                                            value={ task.taskName }
                                            onChange={ (e) => setTask({ ...task, taskName: e.target.value }) }
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
                                            value={ task.assignedTo }
                                            onChange={ (e) => setTask({ ...task, assignedTo: e.target.value }) }
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
                                            value={ task.category }
                                            onChange={ (e) => setTask({ ...task, category: e.target.value }) }
                                        />
                                        <label htmlFor="category">Category</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            id="priority"
                                            value={ task.priority }
                                            onChange={ (e) => setTask({ ...task, priority: e.target.value }) }
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
                                            value={ task.dueDate }
                                            onChange={ (e) => setTask({ ...task, dueDate: e.target.value }) }
                                        />
                                        <label htmlFor="dueDate">Due Date</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            id="status"
                                            value={ task.status }
                                            onChange={ (e) => setTask({ ...task, status: e.target.value }) }
                                        >
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                        <label htmlFor="status">Status</label>
                                    </div>

                                    <div className="mb-3">
                                        <p className="mb-1">Current Attachment</p>
                                        {
                                            task.attachment
                                            ? (
                                                isImage(task.attachment)
                                                ? <img
                                                    src={`http://localhost:4000/uploads/${task.attachment}`}
                                                    alt="current attachment"
                                                    className="img-thumbnail"
                                                    width="200"
                                                  />
                                                : <a
                                                    href={`http://localhost:4000/uploads/${task.attachment}`}
                                                    target="_blank"
                                                    rel="noreferrer">
                                                        View current file
                                                  </a>
                                            )
                                            : <span className="text-muted">No file</span>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="attachment" className="form-label">Change Attachment (optional)</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="attachment"
                                            onChange={ handleFile }
                                        />
                                    </div>
                                    {
                                        preview && (
                                            <div className="mb-3">
                                                <p className="mb-1">New Attachment</p>
                                                <img src={preview} alt="new preview" className="img-thumbnail" width="200" />
                                            </div>
                                        )
                                    }
                                    {
                                        newAttachment && !preview && <p className="text-muted">Selected file: {newAttachment.name}</p>
                                    }
                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2">
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/')}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTask

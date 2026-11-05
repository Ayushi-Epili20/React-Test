import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/task')
        .then((res) => setTasks(res.data))
        .catch((error) => console.log(error))
    }, [])

    const handleDelete = (id) => {
        if (window.confirm('Delete this task?')) {
            axios.delete(`http://localhost:4000/task/${id}`)
            .then(() => setTasks(tasks.filter((task) => task._id !== id)))
            .catch((err) => console.log(err))
        }
    }

    // check if attachment is an image, otherwise show it as a file link
    const isImage = (file) => /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file)

    // search by task name, assigned to, category, priority or status
    const filteredTasks = tasks.filter((task) => {
        const text = search.toLowerCase()
        return (
            task.taskName.toLowerCase().includes(text) ||
            task.assignedTo.toLowerCase().includes(text) ||
            task.category.toLowerCase().includes(text) ||
            task.priority.toLowerCase().includes(text) ||
            task.status.toLowerCase().includes(text)
        )
    })

  return (
    <div className="container">
        <div className="row justify-content-between align-items-center g-2 mb-3">
            <div className="col-md-4">
                <h4>Task List</h4>
            </div>
            <div className="col-md-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by task, assigned to, category, priority or status"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Attachment</th>
                        <th>Task Name</th>
                        <th>Assigned To</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredTasks.map((task) => (
                            <tr key={task._id}>
                                <td>
                                    {
                                        task.attachment
                                        ? (
                                            isImage(task.attachment)
                                            ? <img
                                                src={`http://localhost:4000/uploads/${task.attachment}`}
                                                alt={task.taskName}
                                                width="80"
                                                height="50"
                                                style={{ objectFit: 'cover' }}
                                              />
                                            : <a
                                                href={`http://localhost:4000/uploads/${task.attachment}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-outline-secondary btn-sm">
                                                    View File
                                              </a>
                                        )
                                        : <span className="text-muted">No file</span>
                                    }
                                </td>
                                <td>{task.taskName}</td>
                                <td>{task.assignedTo}</td>
                                <td>{task.category}</td>
                                <td>
                                    <span className={
                                        task.priority === 'High' ? 'badge bg-danger'
                                        : task.priority === 'Medium' ? 'badge bg-warning text-dark'
                                        : 'badge bg-success'
                                    }>
                                        {task.priority}
                                    </span>
                                </td>
                                <td>{new Date(task.dueDate).toLocaleDateString('en-IN')}</td>
                                <td>{task.status}</td>
                                <td>
                                    <NavLink
                                        className="btn btn-warning btn-sm me-2"
                                        to={`/edit/${task._id}`}
                                        role="button">
                                            Edit
                                    </NavLink>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        {
            filteredTasks.length === 0 && <p className="text-center text-muted">No tasks found</p>
        }
    </div>
  )
}

export default Home

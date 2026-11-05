import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
   <nav
    className="navbar navbar-expand-sm navbar-dark bg-primary mb-4"
   >
    <div className="container">
        <NavLink className="navbar-brand" to="/">TaskManagerApp</NavLink>
        <ul className="navbar-nav me-auto flex-row">
            <li className="nav-item me-3">
                <NavLink className="nav-link" to="/" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/add">Add Task</NavLink>
            </li>
        </ul>
    </div>
   </nav>

  )
}

export default Navbar

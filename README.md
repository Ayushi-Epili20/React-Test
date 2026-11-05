# TaskManagerApp

## Objective
A full stack Task Management application (React + Node + MongoDB) to add, view, edit and delete tasks, including a task attachment (image or file) for each task.

## Technologies Used
- React (Vite), react-router-dom, axios, Bootstrap 5
- Node.js, Express.js
- MongoDB with Mongoose
- Multer (file upload)

## Features
- Task list table with attachment preview, task name, assigned to, category, priority, due date and status
- Add task with attachment upload (image preview shown before saving)
- Edit task (keep the existing attachment or upload a new one)
- Delete task with confirmation
- Search by task name, assigned to, category, priority or status (bonus)

## Folder Structure
```
server/   app.js, db/, models/, controllers/, routes/, middleware/, uploads/
client/   src/App.jsx, src/main.jsx, src/components/
```

## Installation Steps
1. Install server packages
   ```
   cd server
   npm install
   ```
2. Install client packages
   ```
   cd client
   npm install
   ```

## How to Run
1. Start MongoDB (database used: `taskmanager` on `mongodb://localhost:27017`).
2. Start the server (runs on port 4000)
   ```
   cd server
   npm start
   ```
3. Start the client in a new terminal
   ```
   cd client
   npm run dev
   ```
4. Open the URL shown by Vite (usually http://localhost:5173).

## API Routes (`/task`)
| Method | Route | Work |
|---|---|---|
| POST | /task/add | add task (multipart form with `attachment` file) |
| GET | /task | all tasks |
| GET | /task/task/:id | one task |
| PUT | /task/:id | update task (attachment optional) |
| DELETE | /task/:id | delete task |

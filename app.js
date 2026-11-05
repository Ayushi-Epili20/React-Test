const express = require('express');
const path = require('path');
const cors = require('cors');
const connectMongo = require('./db/db_config');
const routes = require('./routes/taskRoutes');

const app = express()
connectMongo()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// uploaded attachments can be opened in browser
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/task',routes)

app.listen(4000, () => {
    console.log('server is running....');

})

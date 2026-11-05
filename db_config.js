const mongoose = require('mongoose');

const connectMongo = () =>{
    mongoose.connect('mongodb://localhost:27017/taskmanager')
    .then(()=> console.log('connnected to db...'))
    .catch((err)=>console.log(err))
}

module.exports= connectMongo

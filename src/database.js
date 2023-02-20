//hoja de conexion a la bd

const mongoose = require('mongoose');

const URI =  process.env.MONGODB_URI 
    ? process.env.MONGODB_URI
    :'mongodb://localhost/test';

mongoose.connect(URI, {
});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('db is connected and is '+process.env.MONGODB_URI)
})
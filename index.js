'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

/*
app.listen(config.port, () => {
    console.log(`api res corriendo en el puerto: ${config.port}`);
});

*/

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la bases de datos ${err}`);
    } 
    console.log('Conexion a la base de datos');

    app.listen(config.port, () => {
        console.log(`api res corriendo en el puerto: ${config.port}`);
    });
    
});




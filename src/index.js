const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database')

const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);

//middleware
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/tasks', require('./routes/task.routes'));

//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Servidor
app.listen(app.get('port'), ()=>{
    console.log(`Servidor en puerto ${app.get('port')}`);
});
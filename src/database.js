const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tasks',{useNewUrlParser: true})
    .then(db => console.log('DB conectada'))
    .catch(err => console.log(err));

module.exports = mongoose;
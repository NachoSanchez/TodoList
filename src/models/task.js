const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    status: {type: Boolean, default: false}
});

module.exports = mongoose.model('Task', TaskSchema);
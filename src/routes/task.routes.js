const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//CRUD
router.get('/', async(req,res)=>{
    const tasks = await Task.find();
    //console.log(tasks);
    res.json(tasks);
});

router.get('/:id', async(req,res)=>{
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async(req,res)=>{
    const { title, description }= req.body;
    const task = new Task({ title, description });
    await task.save();
    res.json('Guardado');
});

router.put('/:id', async(req,res)=>{
    const { title, description }= req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json('actualizado');
})

router.delete('/:id', async(req,res)=>{
   await Task.findOneAndDelete(req.params.id);
   res.json('eliminado')
});

module.exports = router;
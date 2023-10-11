var express = require('express');
var router = express.Router();
const StudentModel=require('../models/StudentModel');

router.get('/',async(req,res)=>{
    var students = await StudentModel.find();
    
    res.render('student/index',{students:students})
})

router.get('/detail/:id',async(req,res)=>{
    var id=req.params.id;
    var student=await StudentModel.findById(id);
    res.render('student/detail',{student: student})
})

router.get('/delete/:id',async(req,res)=>{
    var id=req.params.id;
    await StudentModel.findByIdAndDelete(id);
    res.redirect('/student');
})

router.get('/add',(req,res)=>{
    res.render('student/add')
})

router.post('/add',async(req,res)=>{
    var student=req.body;
    await StudentModel.create(student);
    res.redirect('/student');
})
router.get('/edit/:id',async(req,res)=>{
    var id = req.params.id;
    var student = await StudentModel.findById(id);
    res.render('student/edit',{student: student})
})

router.post('/edit/:id',async(req,res)=>{
    var id = req.params.id;
    var student=req.body;
    await StudentModel.findByIdAndUpdate(id,student);
    res.redirect('/student');
});

module.exports = router;
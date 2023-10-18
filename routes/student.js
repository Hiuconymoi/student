var express = require('express');
var router = express.Router();
const StudentModel=require('../models/StudentModel');

router.get('/',async(req,res)=>{
    var students = await StudentModel.find();
    
    res.render('student/index',{students:students})
})

router.get('/list',async(req,res)=>{
    var students = await StudentModel.find();
    res.render('student/list',{students:students})
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

//Search
router.post('/search', async (req, res) => {
    var keyword = req.body.name;
    //relative search
    var students = await StudentModel.find({ name: new RegExp(keyword, "i") });
    res.render('student/index', { students: students });
 })
//Sort
router.get('/nameasc',async(req,res)=>{
    var student=await StudentModel.find().sort({name:1});
    res.render('student/index',{students:student})
})
router.get('/namedsc',async(req,res)=>{
    var student=await StudentModel.find().sort({name:-1});
    res.render('student/index',{students:student})
})
module.exports = router;
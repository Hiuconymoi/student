var express = require('express');
var router = express.Router();
const PlaneModel=require('../models/PlaneModel');
/* GET users listing. */

router.get('/',async(req,res)=>{
    var plane=await PlaneModel.find();
    res.render('plane/index',{planes: plane})
})
router.get('/admin',async(req,res)=>{
    var plane=await PlaneModel.find();
    res.render('plane/admin',{planes: plane})
})

router.get('/detail/:id',async(req,res)=>{
    var id=req.params.id;
    var plane=await PlaneModel.findById(id);
    res.render('plane/detail',{plane: plane})
})

router.get('/delete/:id',async(req,res)=>{
    var id=req.params.id;
    await PlaneModel.findByIdAndDelete(id);
    res.redirect('/plane/admin');
})

router.get('/add',(req,res)=>{
    res.render('plane/add')
})
router.post('/add',async(req,res)=>{
    var plane=req.body;
    await PlaneModel.create(plane);
    res.redirect('/plane/admin');
})

router.get('/edit/:id',async(req,res)=>{
    var id=req.params.id;
    var plane=await PlaneModel.findById(id);
    res.render('plane/edit',{plane: plane});
})
router.post('/edit/:id',async(req,res)=>{
    var id=req.params.id;
    var plane=req.body;
    await PlaneModel.findByIdAndUpdate(id,plane);
    res.redirect('/plane/admin');
})
router.post('/search',async(req,res)=>{
    var keyword=req.body.name;
    var plane=await PlaneModel.find({name: new RegExp(keyword,"i")});
    res.render('plane/admin',{planes: plane});
})

router.get('/priceasc',async(req,res)=>{
    var plane=await PlaneModel.find().sort({price:1});
    res.render('plane/admin',{planes:plane})
})
router.get('/pricedsc',async(req,res)=>{
    var plane=await PlaneModel.find().sort({price:-1});
    res.render('plane/admin',{planes:plane})
})

module.exports = router;

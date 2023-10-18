var express = require('express');
var router = express.Router();
const FigureModel=require('../models/FigureModel');
/* GET users listing. */

router.get('/',async(req,res)=>{
    var figures=await FigureModel.find();
    res.render('figure/index',{figures: figures})
})
router.get('/admin',async(req,res)=>{
    var figures=await FigureModel.find();
    res.render('figure/admin',{figures: figures})
})

router.get('/detail/:id',async(req,res)=>{
    var id=req.params.id;
    var figure=await FigureModel.findById(id);
    res.render('figure/detail',{figure: figure})
})

router.get('/delete/:id',async(req,res)=>{
    var id=req.params.id;
    await FigureModel.findByIdAndDelete(id);
    res.redirect('/figure/admin');
})

router.get('/add',(req,res)=>{
    res.render('figure/add')
})
router.post('/add',async(req,res)=>{
    var figure=req.body;
    await FigureModel.create(figure);
    res.redirect('/figure/admin');
})

router.get('/edit/:id',async(req,res)=>{
    var id=req.params.id;
    var figure=await FigureModel.findById(id);
    res.render('figure/edit',{figure: figure});
})
router.post('/edit/:id',async(req,res)=>{
    var id=req.params.id;
    var figure=req.body;
    await FigureModel.findByIdAndUpdate(id,figure);
    res.redirect('/figure/admin');
})
router.post('/search',async(req,res)=>{
    var keyword=req.body.name;
    var figures=await FigureModel.find({name: new RegExp(keyword,"i")});
    res.render('figure/admin',{figures: figures});
})

router.get('/priceasc',async(req,res)=>{
    var figure=await FigureModel.find().sort({price:1});
    res.render('figure/admin',{figures:figure})
})
router.get('/heightasc',async(req,res)=>{
    var figure=await FigureModel.find().sort({height:1});
    res.render('figure/admin',{figures:figure})
})

module.exports = router;

var express = require('express');
const UserModel = require('../models/UserModel');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
})

router.post('/', async (req, res) => {
  //lấy thông tin từ form login
  // var username = req.body.username;
  // var password = req.body.password;
  // console.log(username+password);
  //lấy dữ liệu user từ db
  var users = await UserModel.find();
  console.log(users);
  //tạo biến boolean để check login
  var login = false;
  
  // chạy vòng lặp for để kiểm tra thông tin login
  // có match với dữ liệu của bảng user trong db không
  // for (let i = 0; i < users.length; i++) {
  //   if (req.body.username == users[i].username && req.body.password == users[i].password) {
  //     login = true;
  //     break;
  //   }
  // }
  var login=await UserModel.findOne({username: req.body.username,password:req.body.password});


  console.log(login)  
  //điều hướng web khi login succeed (vào trang admin) hoặc login fail (về lại trang login)
  if (login)  //login == true
    res.redirect('/student/list')
  else
    res.redirect('/');
})

module.exports = router;
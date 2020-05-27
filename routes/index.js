var express = require('express');
var router = express.Router();
var message = require('../controllers/admin/messageController');
var article = require('../controllers/admin/articleController');
var banner = require('../controllers/admin/bannerController');
var review = require('../controllers/admin/reviewController');
var login = require('../controllers/admin/loginController');
var admin = require('../controllers/admin/adminController');
var film = require('../controllers/admin/film');


var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/uploads'});


//路由中间件
router.use(expressJwt({secret: '35asdfsa5f'}).unless({
    path: [
            "/login", "/upload", "/front/banner", 
            "/front/message", "/front/message/add", 
            "/front/article", "/front/article/goods",
            "/front/review", "/front/review/addreview",
            "/front/film", "/front/filmss"
        ]}));



/* GET home page. */
//登录验证
router.post('/login', login.loginValidate);

//管理员管理
router.get('/admin', admin.getAdmin);
router.post('/admin/add',admin.addAdmin);
router.post('/admin/change',admin.changeAdmin);

//留言的处理
router.get('/message', message.getMessage);
router.post('/message/add', message.postMessage);
router.get('/message/del', message.delMessage);

//文章的管理
router.get('/article', article.getArticle);
router.post('/article/goods', article.addGoods);
router.get('/article/del', article.delArticle);
router.post('/article/add', article.addArticle);

//电影的管理
router.get('/film', film.getFilm);
router.get('/film/del', film.delFilm);
router.post('/film/add', film.addFilm);

//文章评论
router.get('/review', review.getReview);
router.post('/review/addreview', review.postReview);

//首页轮播图
router.get('/banner', banner.getBanner);




//上传图片
router.post('/upload', upload.single('file'), function(req, res) {
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.render("error", {message: "上传文件不能为空！"});
        return;
    } else {
       let file = req.file;
       file.url = `http://localhost:3000/public/uploads/${file.filename}`;
        // 设置响应类型及编码
       res.set({'content-type': 'application/json; charset=utf-8'});
       //添加url属性
       res.send(file);
    }
})

//前台

//留言的处理
router.get('/front/message', message.getMessage);
router.post('/front/message/add', message.postMessage);

//文章的管理
router.get('/front/article', article.getArticle);
router.post('/front/article/goods', article.addGoods);

//文章评论
router.get('/front/review', review.getReview);
router.post('/front/review/addreview', review.postReview);

//首页轮播图
router.get('/front/banner', banner.getBanner);

//电影信息
router.get('/front/film', film.getFilm);
router.get('/front/filmss', film.getfiveFilm);
router.get('/front/del', film.delFilm);
router.post('/front/add', film.addFilm);


module.exports = router;

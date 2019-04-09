var express = require('express');
var router = express.Router();
var Category = require('../modal/categories');
//khai báo category dẫn tới file category.js vừa tạo ở mục modal
var Products = require('../modal/products');
var multer = require('multer');
var shortid = require('shortid');
//config noi luu tru
var storage = multer.diskStorage({
    //loi lưu trữ
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },

    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "--" + file.originalname);
    }
});
var upload = multer({storage: storage})
/* GET home page. */
router.get('/products', function (req, res, next) {
    Products.find({}, function (err, data) {
        res.render('index', {products: data});
    })
});
router.get('/Padd', function (req, res, next) {
    Category.find({}, function (err, data) {
        //viết code hiển thị
        res.render('productadd', {categories: data});//tên categories có thể đặt tùy ý
    })
});
router.get('/Pedit/:cate_id', function (req, res, next) {
    Category.find({}, function (err, data) {
        //viết code hiển thị
    Products.findOne({_id:req.params.cate_id }, function (err,products) {
        if(err){
            res.send('ID ko ton tai');
        }
        for(var i = 0; i < data.length; i++){
            if(data[i]._id == products.cate_id.toString()){
                data[i].selected = true;
            }
        }
        res.render('productedit', {products: products ,categories: data});

    });
    });
});
router.post('/products/save-edit', upload.single('image'), function(req, res, next){

    Products.findOne({_id: req.body.id}, function(err, modal){
        if(err){
            res.redirect('back');
        }
        modal.name = req.body.name;
        modal.price = req.body.price;
        modal.detail = req.body.detail;
        modal.cate_id = req.body.cate_id;
        if(req.file != null){
            modal.image = req.file.path.replace('public', '');
        }

        modal.save(function(err){
            if(err){
                res.send('Luu khong thanh cong');
            }

            res.redirect('/products');
        })
    })
});
router.get('/Premove/:cate_id', function (req, res, next) {
    Products.deleteOne({_id: req.params.cate_id}, function (err) {
        res.redirect('/products');
    });
});
router.get('/cates', function (req, res, next) {
    Category.find({}, function (err, data) {
        //viết code hiển thị
        res.render('category', {categories: data});//tên categories có thể đặt tùy ý
    })
});

router.post('/cates/save-add', upload.single('image'), function (req, res, next) {

    // tao modal
    var modal = new Category();
    // gan gia tri cho modal
    modal.name = req.body.name;
    modal.image = req.file.path.replace('public', '');
    modal.description = req.body.description;

    // luu
    modal.save(function (err) {
        if (err) {
            res.send("luu ko thanh cong")
        }
        res.redirect('/cates');
    })

})
router.post('/cates/save-edit', upload.single('image'), function(req, res, next){
    Category.findOne({_id: req.body.id}, function(err, modal){
        if(err){
            res.redirect('back');
        }

        modal.name = req.body.name;
        modal.description = req.body.description;
        if(req.file != null){
            modal.image = req.file.path.replace('public', '');
        }

        modal.save(function(err){
            if(err){
                res.send('Luu khong thanh cong');
            }

            res.redirect('/cates');
        })
    })
});
router.post('/products/save-add', upload.single('image'), function (req,res,next) {
    var modal = new Products();
    modal.name = req.body.name;
    modal.price = req.body.price;
    modal.detail = req.body.detail;
    modal.image = req.file.path.replace('public', '');
    modal.cate_id = req.body.cate_id;

    modal.save(function (err) {
        if (err) {
            res.send("luu ko thanh cong")
        }
        res.redirect('/products');
    })
})
//sau đó đi đến trang category.hbs
//ở đây t muốn hiển thị danh mục trước nên t làm như sau
router.get('/Cadd', function (req, res, next) {
    res.render('categoryadd', {title: 'Thêm Danh mục'});
});
router.get('/Cedit/:cate_id', function (req, res, next) {
    // res.render('categoryedit', {title: 'Sửa Danh mục'});

    Category.findOne({_id:req.params.cate_id }, function (err,data) {
        if(err){
            res.send('ID ko ton tai');
        }
        res.render('categoryedit', {cate: data});
    })
});
router.get('/Cremove/:cate_id', function (req, res, next) {
    Category.deleteOne({_id: req.params.cate_id}, function (err) {
        res.redirect('/cates');
    });

});
module.exports = router;

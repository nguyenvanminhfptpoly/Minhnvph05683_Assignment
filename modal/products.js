var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:  {type: String, unique : true, required : true, dropDups: true},
    cate_id : {type: Schema.Types.ObjectId},
    image: {type: String, default: null},
    price: {type: Number},
    detail: {type: String}
});

module.exports = mongoose.model('products', categorySchema);

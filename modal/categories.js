var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:  {type: String, unique : true, required : true, dropDups: true},
    description: {type: String, default: null},
    image: {type: String, default: null}
});


module.exports = mongoose.model('categories', categorySchema);
//trong đây là code kết nối tới colection trong database
//categories là tên của colection đó nhớ phải ghi đúng tên
/*Schema för inköpslista*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var buylistSchema = new Schema({
    item: String,
    checked: Boolean
});

module.exports = mongoose.model("Buylist", buylistSchema);
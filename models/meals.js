/*Schema för måltider*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mealsSchema = new Schema({
    weekday: String,
    meal: String
});

module.exports = mongoose.model("Meals", mealsSchema);
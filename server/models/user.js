var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    FirstName: String,
    LastName: String,
    // Photo: String,
    Email: String,
    Gmail: String,
    // Group: String,
    Consent: Boolean,
    Institution: String,
    Date: {type: Date, default: Date.now}
});
module.exports = mongoose.model("User", userSchema);

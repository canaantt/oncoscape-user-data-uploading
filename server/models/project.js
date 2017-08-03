var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var File = require("../models/file");
var IRB = require("../models/irb");
var Permission = require("../models/permission");
var status = ["uploaded", "upload started", "failed"];
var projectSchema = new Schema({
    Name: String,
    Description: String,
    Annotations: [{key: String, value: String}], 
    Private: Boolean,
    // IRBNumber: String,
    DataCompliance:  {IRBNumber: String, IECNumber: String, Waiver: String, ComplianceOption: String},
    File: {filename: String, size: Number, timestamp: Date},
    Permissions: [{type: Schema.ObjectId, ref: Permission}],
    Date: {type: Date, default: Date.now},
    Author: {type: String}
});
module.exports = mongoose.model("Project", projectSchema);


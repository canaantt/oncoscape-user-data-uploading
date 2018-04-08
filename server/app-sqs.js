var save = require('./data_uploading_modules/DatasetSave.js');
const XLSX =require("xlsx");
const _ = require('lodash');
const zlib = require('zlib');
const express = require('express');
const awsCli = require('aws-cli-js');
const Options = awsCli.Options;
const AWSCLI = awsCli.Aws;
const awscli = new AWSCLI();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sqs = new AWS.SQS();
var genemap = require('./data_uploading_modules/DatasetGenemap.json');
var requirements = require('./data_uploading_modules/DatasetRequirements.json');
var validate = require('./data_uploading_modules/DatasetValidate.js');
var serialize = require('./data_uploading_modules/DatasetSerialize.js');

var load = require('./data_uploading_modules/DatasetLoad.js');
var helper = require('./data_uploading_modules/DatasetHelping.js');
const json2S3 = (msg) => {
    console.log('%%%%%%%%%received file');
    console.log('projectID is: ', msg);
    console.log('%%%%%%%%%XLSX.readFile');
    console.time("Reading XLSX file");

    var filePath = msg.filePath;
    var projectID = msg.projectID;

    var errors = {};

    // Load Excel (Specific)
    var sheets = load.xlsx(filePath, XLSX); // Array of sheets [ {name:'xxx', data:data}, {name:'xxx', data:data} ]

    // Validate Sheets (Generic)
    errors['sheet_level'] = sheets.map(sheet => validate.validateSheet(sheet, requirements, _, helper));
    
    // Validate Workbook (Generic)
    errors['sheets_existence'] = validate.validateWorkbookExistence(sheets, requirements, genemap, _, helper);
    errors['patientID_overlapping'] = validate.validateWorkbookPatientIDOverlapping(sheets, requirements, genemap, _, helper);
    errors['sampleID_overlapping'] = validate.validateWorkbookSampleIDOverlapping(sheets, requirements, genemap, _, helper);
    errors['geneID_overlapping'] = validate.validateWorkbookGeneIDsOverlapping(sheets, requirements, genemap, _, helper);
    
    console.log('====== Error Message =======');
    console.log(errors);

    // #region Serialize Sheets (Generic)
    sheetsSerialized = [];
    var events = [];
    sheets.forEach(sheet=>{
        var obj = serialize.sheet(sheet, _, XLSX);
        if (obj.type !== 'EVENT') {
            sheetsSerialized = sheetsSerialized.concat(obj);
        } else {
            events = events.concat(obj);
        }
    });
    var obj = {};
    obj.type = 'EVENT';
    obj.name = 'EVENT';
    var ob = {};
    var m = {};
    var v = [];
    events.forEach(e=> {
        m[e.res.map.type] = e.res.map.category;
        v = v.concat(e.res.value);
    });
    var type_keys = Object.keys(m);
    v.forEach(elem => elem[1] = type_keys.indexOf(elem[1]));
    ob.map = m;
    ob.value = v;
    obj.res = ob;
    sheetsSerialized = sheetsSerialized.concat(obj); 
    // #endregion

    // Upload Sheets To S3 (Specific)
    var s3UploadConfig = {
        region: 'us-west-2',
        params: {Bucket:'oncoscape-users-data'}
    }
    uploadResults = sheetsSerialized.map(sheet => save.toS3(sheet, projectID, s3UploadConfig, AWS, s3, zlib));
   
    // Serialize Manifest (Generic)
    manifestSerialized = serialize.manifest(sheetsSerialized, uploadResults);

    // Upload Manifest To S3 (Specific)
    manifestURL = save.toS3(manifestSerialized, projectID, s3UploadConfig, AWS, s3, zlib);
    
     
    return manifestURL;
}
AWS.config.update({
    region: 'us-west-2'
  });
const Consumer = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/179462354929/upload2s3',
  handleMessage: (message, done) => {
    var filename = JSON.parse(message.Body).Records[0].s3.object.key;
    console.log('==> the message is', filename);
    var params = {Bucket:"user-data-oncoscape",
                  Key: filename};

    awscli.command('s3 cp s3://user-data-oncoscape/' + filename + ' /usr/src/app/uploads/' + filename, function (err, data) {
        if(err){
            console.log(err);
        } else {
            console.log('success');
            var msg = {};
            msg.filePath = '/usr/src/app/uploads/' + filename;
            msg.projectID = 'aws-sample';
            var signedURL = json2S3(msg);
            console.log(signedURL);
            done();
        }
    });
  },
  sqs: new AWS.SQS()
});

app.on('error', (err) => {
  console.log(err.message);
});

app.start();






  
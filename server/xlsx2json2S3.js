const express = require('express');
const jsonfile = require("jsonfile");
var _ = require('lodash');
const asyncLoop = require('node-async-loop');
const XLSX =require("xlsx");
const fs = require('fs');
const zlib = require('zlib');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

var genemap = require('./data_uploading_modules/DatasetGenemap.json');
var requirements = require('./data_uploading_modules/DatasetRequirements.json');
var validate = require('./data_uploading_modules/DatasetValidate.js');
var serialize = require('./data_uploading_modules/DatasetSerialize.js');
var save = require('./data_uploading_modules/DatasetSave.js');
var load = require('./data_uploading_modules/DatasetLoad.js');
var helper = require('./data_uploading_modules/DatasetHelping.js');

var s3UploadConfig = {
    region: 'us-west-2',
    params: {Bucket:'oncoscape-users-data'}
}
s3.config.region = s3UploadConfig.region;

var xlsx2json = function(workbook) {
    var result = [];
    var allSheetNames =  Object.keys(workbook.Sheets);
    allSheetNames.forEach(function(sheetName){
        var sheet = {
            type : sheetName.split('-')[0].toUpperCase(),
            header: null
        };
        var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], 
            { header:1, raw:true});
        if(sheet.type === 'PATIENT') {
            sheet.header = data[0];
            data.splice(0, 1);
            sheet.data = data;
            var obj = {};
            var res = {};
            var ids = sheet.data.map(d=>d[0]);
            var fields = {};
            var loc = Object.keys(workbook.Sheets[Object.keys(workbook.Sheets).find(k=>k.toUpperCase() === 'PATIENT')]).filter(k=>k[1]=='1'&& k.length==2);
            var colTypes = loc.map(c=>{
                var row = 2;
                while (workbook.Sheets.PATIENT[c[0]+row].t === 'z') {
                    row++;
                }
                return workbook.Sheets.PATIENT[c[0]+row].t;
            });
            loc.forEach(function(l, i){
                var v;
                if(colTypes[i] === 'n') {
                    var string2float = sheet.data.map(d=>parseFloat(d[i]));
                    v = {
                        'min' : _.min(string2float),
                        'max' : _.max(string2float)
                    }
                } else {
                    v = _.uniq(sheet.data.map(d=>d[i]));
                    if(v.indexOf(undefined) > -1) {
                        v.splice(v.indexOf(undefined), 1);
                    }
                }
                fields[sheet.header[i]] = v;
            });
            res.ids = ids;
            res.fields = _.omit(fields, Object.keys(fields)[Object.keys(fields).map(f=>f.toUpperCase()).indexOf('PATIENTID')]);
            // #region remove patientID column from original data
            var headercopy = sheet.header;
            var omitloc1 = headercopy.map(h=>h.toUpperCase()).indexOf('PATIENTID');
            headercopy.splice(omitloc1, 1);
            sheet.data.forEach(d=>{
                d.splice(omitloc1, 1);
            });
            colTypes.splice(omitloc1, 1);
            // #endregion remove patientID column from original data
            res.value = sheet.data.map(d=>{
                var arr = [];
                d.forEach(function(v, i){
                    if(colTypes[i] === 'n'){
                        if(v !== undefined) {
                            arr[i] = parseFloat(v);
                        }
                    } else {
                        if(v !== undefined) {
                            arr[i] = fields[headercopy[i]].indexOf(v);
                        }
                    }
                }); 
                return arr;
            });
            obj.res = res;
            obj.type = sheet.type;
            obj.name = sheetName;
            result.push(obj);
            // console.log(obj);
            // jsonfile.writeFile('demo-patient.json', obj, function (err) {
            //     console.error(err)
            //   });
        } else if (sheet.type === 'SAMPLE') {
            sheet.header = data[0];
            data.splice(0, 1);
            sheet.data = data;
            // #region Patient-Sample Mapping
            var sampleIDLocation = sheet.header.map(n=>n.toUpperCase()).indexOf('SAMPLEID');
            var patientIDLocation = sheet.header.map(n=>n.toUpperCase()).indexOf('PATIENTID');
            var keys = _.uniq(data.map(d=>d[patientIDLocation]));
            var patientSampleMapping = {};
            keys.forEach(k=>{
                patientSampleMapping[k] = data.filter(d=>d[patientIDLocation]===k)
                                            .map(d=>d[sampleIDLocation]);
            });
            var obj = {};
            obj.type = 'PSMAP';
            obj.name = sheetName;
            obj.res = patientSampleMapping;
            result.push(obj);
            // #endregion Patient-Sample Mapping
            
            // #region Sample Annotation
            var obj = {};
            var res = {};
            var ids = data.map(d=>d[0]);
            var fields = {};
            var loc = Object.keys(workbook.Sheets[Object.keys(workbook.Sheets).find(k=>k.toUpperCase() === 'SAMPLE')]).filter(k=>k[1]=='1'&& k.length==2);
            var colTypes = loc.map(c=>{
                var row = 2;
                while (workbook.Sheets.SAMPLE[c[0]+row].t === 'z') {
                    row++;
                }
                return workbook.Sheets.SAMPLE[c[0]+row].t;
            });
            loc.forEach(function(l, i){
                var v;
                if(colTypes[i] === 'n') {
                    var string2float = sheet.data.map(d=>parseFloat(d[i]));
                    v = {
                        'min' : _.min(string2float),
                        'max' : _.max(string2float)
                    }
                } else {
                    v = _.uniq(sheet.data.map(d=>d[i]));
                    if(v.indexOf(undefined) > -1) {
                        v.splice(v.indexOf(undefined), 1);
                    }
                }
                fields[sheet.header[i]] = v;
            });
            fields = _.omit(fields, Object.keys(fields)[Object.keys(fields).map(f=>f.toUpperCase()).indexOf('PATIENTID')], 
                                    Object.keys(fields)[Object.keys(fields).map(f=>f.toUpperCase()).indexOf('SAMPLEID')]);
            res.ids = ids;
            res.fields = fields;
            var headercopy = sheet.header;
            var omitloc1 = headercopy.map(h=>h.toUpperCase()).indexOf('PATIENTID');
            headercopy.splice(omitloc1, 1);
            var omitloc2 = headercopy.map(h=>h.toUpperCase()).indexOf('SAMPLEID');
            headercopy.splice(omitloc2, 1);
            sheet.data.forEach(d=>{
                d.splice(omitloc1, 1);
                d.splice(omitloc2, 1);
            });
            colTypes.splice(omitloc1, 1);
            colTypes.splice(omitloc2, 1);
            res.value = sheet.data.
                map(d=>{
                    var arr = [];
                    d.forEach(function(v, i){
                        if(colTypes[i] === 'n'){
                            if(v !== undefined) {
                                arr[i] = parseFloat(v);
                            }
                        } else {
                            if(v !== undefined) {
                                arr[i] = fields[headercopy[i]].indexOf(v);
                            }
                        }
                    }); 
                    return arr;
                });
            obj.res = res;
            obj.type = sheet.type;
            obj.name = sheetName;
            result.push(obj);
            // #endregion Sample Annotation

            // console.log(patientSampleMapping);
            // jsonfile.writeFile('demo-sample.json', data, function (err) {
            //     console.error(err)
            //   });
            // jsonfile.writeFile('demo-psmap.json', patientSampleMapping, function (err) {
            //     console.error(err)
            //   });
        } else if (sheet.type === 'EVENT') {
            sheet.header = data[0];
            data.splice(0, 1);
            var obj = {};
            var res = {};
            var map = {};
            var headerUpperCase = sheet.header.map(n=>n.toUpperCase());
            var patientIDLocation = headerUpperCase.indexOf('PATIENTID');
            var categoryLocation = headerUpperCase.indexOf('CATEGORY');
            var typeLocation = headerUpperCase.indexOf('TYPE');
            var startDateLocation = headerUpperCase.indexOf('STARTDATE');
            var endDateLocation = headerUpperCase.indexOf('ENDDATE');
            var reservedHeaderLocations = [patientIDLocation, categoryLocation, typeLocation, startDateLocation, endDateLocation];
            var customHeaders = sheet.header.filter((h, i)=>reservedHeaderLocations.indexOf(i) === -1);

            var uniqueTypes = _.uniq(data.map(d=>d[typeLocation]));
            uniqueTypes.forEach(t=>{
                map[t]=data.find(d=>d[typeLocation]===t)[categoryLocation];
            });
            var value = data.map(d=>{
                var arr = [];
                arr[0] = d[0];
                arr[1] = uniqueTypes.indexOf(d[typeLocation]);
                arr[2] = parseInt(d[startDateLocation]);
                arr[3] = parseInt(d[endDateLocation]);
                var o = {};
                customHeaders.forEach(h=>{
                    o[h] = d[sheet.header.indexOf(h)];
                });
                arr[4] = o;
                return arr;
            });
            res.map = map;
            res.value = value;
            obj.res = res;
            obj.type = sheet.type;
            obj.name = sheetName;
            result.push(obj);
            // console.log(obj);
            // jsonfile.writeFile('demo-events.json', obj, function (err) {
            //     console.error(err)
            //   });
        } else if (sheet.type === 'GENESETS') {
            var genesets = {};
            data.forEach(d=>{
                if(d.length !== 0){
                    var k = d[0];
                    d.splice(0, 1);
                    genesets[k] = _.uniq(d);
                }
            });
            var obj = {};
            obj.type = sheet.type;
            obj.name = sheetName;
            obj.res = genesets;
            result.push(obj);
            // console.log(genesets);
            // jsonfile.writeFile('demo-genesets.json', genesets, function (err) {
            //     console.error(err)
            //   });
        } else if (sheet.type === 'MUT') {
            var obj = {};
            var res = {};
            sheet.tableType = data[0][1];
            sheet.tableName = data[1][1];
            sheet.header = data[2];
            data.splice(0, 3);
            var ids = _.uniq(data.map(d=>d[1]));
            var genes = _.uniq(data.map(d=>d[0]));
            var mutTypes = _.uniq(data.map(d=>d[2]));
            var values = data.map((d)=>{
                return(ids.indexOf(d[1]) + '-' +
                       genes.indexOf(d[0]) + '-' +
                       mutTypes.indexOf(d[2]));
            });
            res.ids = ids;
            res.genes = genes;
            res.values = values;
            obj.res = res;
            obj.type = sheet.type;
            obj.name = sheetName;
            result.push(obj);
        } else if (sheet.type === 'MATRIX') {
            var obj = {};
            var res = {};
            sheet.tableType = data[0][1];
            sheet.tableName = data[1][1];
            data[2].splice(0, 1);
            var ids = data[2];
            data.splice(0, 3);
            var genes = data.map(d=>d[0]);
            var values = data.map(d=>{
                d.splice(0, 1);
                return d.map(dd=>parseFloat(dd))
            });
            res.ids = ids;
            res.genes = genes;
            res.values = values;
            obj.res = res;
            obj.type = sheet.type;
            obj.name = sheetName;
            result.push(obj);
            // console.log(obj);
            // jsonfile.writeFile('demo-'+sheet.tableType+'.json', obj, function (err) {
            //     console.error(err)
            //   });
        }
    });
    return result;
};

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
    

    // Serialize Sheets (Generic)
    sheetsSerialized = [];
    sheets.forEach(sheet => {
        sheetsSerialized = sheetsSerialized.concat(serialize.sheet(sheet, _, XLSX));
    }); 

    // Upload Sheets To S3 (Specific)
    uploadResults = sheetsSerialized.map(sheet => save.server(sheet, 'projectId', s3UploadConfig, AWS, s3, zlib));
    
    // Serialize Manifest (Generic)
    manifestSerialized = serialize.manifest(sheetsSerialized, uploadResults);

    // Upload Manifest To S3 (Specific)
    manifestURL = save.s3(manifestSerialized, projectID, s3UploadConfig, AWS, s3, zlib);
    
     
    return manifestURL;
}

process.on('message', (filePath) => {
    var signedURL = json2S3(filePath);
    process.send(signedURL);
});


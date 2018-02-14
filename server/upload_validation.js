/* input: workbook Object parsed by node package xlsx
   output: a reporting JSON object
*/

// region GENE_MAP
// const mongoose = require("mongoose");
// const jsonfile = require("jsonfile-promised");
// mongoose.connect(
//     'mongodb://oncoscape-dev-db1.sttrcancer.io:27017,oncoscape-dev-db2.sttrcancer.io:27017,oncoscape-dev-db3.sttrcancer.io:27017/v2?authSource=admin', {
//     db: {
//         native_parser: true
//     },
//     server: {
//         poolSize: 5,
//         reconnectTries: Number.MAX_VALUE
//     },
//     replset: {
//         rs_name: 'rs0'
//     },
//     user: process.env.MONGO_USERNAME,
//     pass: process.env.MONGO_PASSWORD
// });
// var connection = mongoose.connection;
// var gene_map;
// connection.once('open', function() {
//     var db = connection.db; 
//     db.collection('z_lookup_genemap').find().toArray(function(err, data) {
//         if(err) console.log(err);
//         gene_map = data;
//         jsonfile.writeFile('gene_map.json', gene_map, function (err) {
//             console.error(err);
//         });
//     });
// });
// regionend

var exports = module.exports = {};
const XLSX =require("xlsx");
const _ = require('underscore');
const zlib = require('zlib');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
var gene_mapping = require('./gene_map.json');
var helpingFunctionFactory = {
    get_headers: function(sheet, headerLineNum) {
        var loc = Object.keys(sheet).filter(k=>k[1]==headerLineNum && k.length==2 && sheet[k].t !== 'z');
        return loc.map(l=>sheet[l].v);
    },
    get_fieldValues: function(sheet, headerLineNum, header) {
        var loc = Object.keys(sheet).filter(k=>k[1]==headerLineNum && k.length==2 && sheet[k].t !== 'z');
        var headers = loc.map(l=>sheet[l].v.toUpperCase());
        var re = /[A-Z]/gi;
        var header_loc = loc[headers.indexOf(header)].match(re)[0];
        var found = Object.keys(sheet).filter(k=>k.match(re)[0] === header_loc);
        var value = found.map(l=>sheet[l]).filter(f=>'v' in f).map(f=>f.v);
        value.splice(0, headerLineNum);
        return value;
    },
    get_rowValues: function(sheet, rowNumber) {
        var re = /[0-9]+/gi;
        var loc = Object.keys(sheet).filter(k=>{
            if(k.match(re) !== null && 
               parseInt(k.match(re)[0]) === rowNumber &&
               sheet[k].t !== 'z'){
                return k;
            }
        });
        return loc.map(l=>sheet[l].v);    
    },
    get_colValues: function(sheet, headerLineNum, col) {
        var re = /[A-Z]+/gi;
        var index = 0;
        var loc = Object.keys(sheet).filter(k=>{
            if(k.match(re) !== null && 
               k.match(re)[0] === col &&
               sheet[k].t !== 'z'){
                return k;
            }
        });
        loc.splice(0, headerLineNum);
        return loc.map(l=>sheet[l].v);
    },
    get_geneSetNames: function(geneset_sheet) {
        var loc = Object.keys(geneset_sheet).filter(k=>k[0]==='A' && k.length ===2 && geneset_sheet[k].t !=='z');
        return loc.map(l=>geneset_sheet[l].v);
    },
    check_uniqueness: function(arr) {
        return arr.length == new Set(arr).size;
    },
    field_existence: function(header, requiredFieldArr) {
        var error = {};
        var header2Upper = header.map(h=>h.toUpperCase());
        error['field_existence'] = {
            'missing_fields': requiredFieldArr.filter(fn=>header2Upper.indexOf(fn)==-1)
        };
        return error;
    },
    overlapping: function(array1, refArr) {
        var a = new Set(array1);
        var b = new Set(refArr);
        var intersection = new Set([...a].filter(x => b.has(x)));
        var difference = new Set([...a].filter(x => !b.has(x)));
        var intersectionPercentage = intersection.size/a.size * 100;
        var differencePercentage = difference.size/a.size * 100;
        return {'overlappedPercentage': intersectionPercentage,
                'notInRefPercentage': differencePercentage,
                'notInRef': difference};
    },
    getAllIndexes: function(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    },
    Type_Category_inclusion: function(sheet) {
        var error = {};
        var subCategoryArr = this.get_fieldValues(sheet, 1, 'TYPE');
        var categoryArr = this.get_fieldValues(sheet, 1, 'CATEGORY');
        var err = {};
        _.uniq(subCategoryArr).forEach(sc=>{
            var cat =_.uniq(this.getAllIndexes(subCategoryArr, sc).map(ind=>categoryArr[ind]));
            if( cat.length > 1){
                err[sc] = cat; 
            }
        });
        error['subCategoryMatchMultipleCategory'] = err;
        return error;
    }
};

var requirements = {
    'PATIENT':{
        'required_fields':['PATIENTID'],
        'unique_fields':['PATIENTID'],
        'headerLineNum': 1
    },
    'SAMPLE':{
        'required_fields':['SAMPLEID', 'PATIENTID'],
        'unique_fields':['SAMPLEID'],
        'headerLineNum': 1
    },
    'EVENT':{
        'required_fields':['PATIENTID', 'CATEGORY', 'TYPE', 'STARTDATE', 'ENDDATE'],
        'headerLineNum': 1,
        'dependencies': ['PATIENT'],
        'sheet_specific_checking': ['Type_Category_inclusion']
    },
    'GENESETS':{
        'headerLineNum': null
    },
    'MUT':{
        'headerLineNum': 3,
        'dependencies': ['SAMPLE']
    },
    'MATRIX':{
        'headerLineNum': 3,
        'dependencies': ['SAMPLE']
    }
};

// #region S3 config
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
//AWSConfigsS3.UseSignatureVersion4 = false;
AWS.config.credentials = credentials;
s3.config.region = 'us-west-2';
var params = {Bucket:'canaantt-test'};
var s3Factory = {
    gzip_upload2S3_private: function(JSONOBJ, FILENAME){
        zlib.gzip(JSON.stringify(JSONOBJ), level=9, function(err, result){
            s3.putObject({Bucket:'canaantt-test', 
                      Key: FILENAME, 
                      Body: result, 
                      ACL:'private',
                      'ContentEncoding': 'gzip',
                      'ContentType': 'application/json'
                      }, 
                      function(res, err){
                          console.log(res);
                          if(err){
                              console.log(err);
                          }
                          console.log('Success!');
                        });
        });
    },
    signURL: function(FILENAME){
        var params = { Bucket: 'canaantt-test', 
                       Key: FILENAME, 
                       Expires: 15552000}; // url expires in 180 Days
        return s3.getSignedUrl('getObject', params);
    }
}
// #endregion

exports.readXLSX = function(xlsxFile) {
    return XLSX.readFile("demo.xlsx", {sheetStubs: true});
};

exports.preUploading_sheetLevel_checking = function(sheet, sheetName) {
    var err = {};
    var type = sheetName.split('-')[0].toUpperCase();
    if('required_fields' in requirements[type]) {
        var header = helpingFunctionFactory.get_headers(sheet, 1);
        var requiredFields = requirements[type]['required_fields'];
        err['required_fields'] = helpingFunctionFactory.field_existence(header, requiredFields);
    }
    if('unique_fields' in requirements[type]) {
        var uniqueFields = requirements[type]['unique_fields']; 
        var e = {};
        uniqueFields.forEach(uniqueField=>{
            var headerLineNum = requirements[type]['headerLineNum'];
            var unique_field_values = helpingFunctionFactory.get_fieldValues(sheet, headerLineNum, uniqueField);
            e[uniqueField] = helpingFunctionFactory.check_uniqueness(unique_field_values);
        });
        err['unique_fields'] = e;
    } 
    if('sheet_specific_checking' in requirements[type]) {
        var e = {};
        requirements[type]['sheet_specific_checking'].forEach(functionName=>{
            e[functionName] = helpingFunctionFactory[functionName](sheet);
        });
        err['sheet_specific_checking'] = e;
    }
    return err;
};

exports.preUploading_sheetLevelAllworkbook_checking = function(workbook) {
        var error = {};
        var allSheetNames =  workbook.SheetNames;
        var index = 0;
        allSheetNames.forEach(function(sheetName) {
            console.log(sheetName);
            var err = {};
            var type = sheetName.split('-')[0].toUpperCase();
            if('required_fields' in requirements[type]){
                var header = helpingFunctionFactory.get_headers(workbook.Sheets[sheetName], 1);
                var requiredFields = requirements[type]['required_fields'];
                err['required_fields'] = helpingFunctionFactory.field_existence(header, requiredFields);
            }
            if('unique_fields' in requirements[type]){
                var uniqueFields = requirements[type]['unique_fields']; 
                var e = {};
                uniqueFields.forEach(uniqueField=>{
                    var headerLineNum = requirements[type]['headerLineNum'];
                    var unique_field_values = helpingFunctionFactory.get_fieldValues(workbook.Sheets[sheetName], headerLineNum, uniqueField);
                    e[uniqueField] = helpingFunctionFactory.check_uniqueness(unique_field_values);
                });
                err['unique_fields'] = e;
            } 
            if('sheet_specific_checking' in requirements[type]){
                var e = {};
                requirements[type]['sheet_specific_checking'].forEach(functionName=>{
                    e[functionName] = helpingFunctionFactory[functionName](workbook.Sheets[sheetName]);
                });
                err['sheet_specific_checking'] = e;
            }
            /* Sheet-specific validation 
            [ ] - Event - check the format of 'startDate' and 'endDate': ['timeStamp', 'number']
            [ ] - MATRIX & MUT - check the first three lines
            [x] - Sheet Dependencies
            */
            error[sheetName] = err;
        });
        return error;
};

exports.preUploading_allSheets_checking = {
    allSheets_existance: function(workbook) {
        var obj = {};
        var required_sheetTypes = ['PATIENT', 'SAMPLE'];
        var permissible_sheetTypes = ['EVENT', 'GENESETS', 'MATRIX', 'MUT'];
        var sheetsSet = new Set(workbook.SheetNames.map(n=>n.split('-')[0].toUpperCase()));
        obj['required_sheets'] = required_sheetTypes.map(s=>{
            var o = {};
            var sheetNames = workbook.SheetNames.filter(n=>n.toUpperCase().indexOf(s)>-1);
            o[s] = {'exists': sheetsSet.has(s),
                    'sheetNames': sheetNames};
            return o;
        });
        obj['permissible_sheets'] = permissible_sheetTypes.map(s=> {
            var o = {};
            var sheetNames = workbook.SheetNames.filter(n=>n.toUpperCase().indexOf(s)>-1);
            o[s] = {'exists': sheetsSet.has(s),
                    'sheetNames': sheetNames};
            return o;
        });
        
        var error_dependencies = {};
        Object.keys(requirements).forEach(type=>{
            
            if('dependencies' in requirements[type]){
                error_dependencies[type] = requirements[type]['dependencies'].filter(s=>!sheetsSet.has(s));
            }
        });
        obj['error_dependencies'] = error_dependencies;
        return obj;
    },
    patientID_overlapping: function(workbook) {
        var evaluation = {};
        var headerLineNum = requirements['PATIENT']['headerLineNum'];
        var uniqueField = 'PATIENTID';
        var pt_list = helpingFunctionFactory.get_fieldValues(workbook.Sheets['PATIENT'], headerLineNum, uniqueField);
        
        var pt_related_sheets = workbook.SheetNames.filter(sn=>['SAMPLE', 'EVENT'].indexOf(sn.split('-')[0]) > -1);
        pt_related_sheets.forEach(sheetName=>{
            var sheet_type = sheetName.split('-')[0];
            var headerLineNumber = requirements[sheet_type]['headerLineNum'];
            var uniqueField = 'PATIENTID';
            var pts = helpingFunctionFactory.get_fieldValues(workbook.Sheets[sheetName], headerLineNumber, uniqueField);
            evaluation[sheetName] = helpingFunctionFactory.overlapping(pts, pt_list);    
        });
        return evaluation;
    },
    sampleID_overlapping: function(workbook) {
        var evaluation = {};
        var headerLineNum = requirements['SAMPLE']['headerLineNum'];
        var uniqueField = 'SAMPLEID';
        var sample_list = helpingFunctionFactory.get_fieldValues(workbook.Sheets['SAMPLE'], headerLineNum, uniqueField);
        var sample_related_sheets = workbook.SheetNames.filter(sn=>['MATRIX', 'MUT'].indexOf(sn.split('-')[0]) > -1);
        sample_related_sheets.forEach(sheetName=>{
            console.log(sheetName);
            var sheet_type = sheetName.split('-')[0];
            switch (sheet_type) {
                case 'MATRIX':
                    var samples = helpingFunctionFactory.get_rowValues(workbook.Sheets[sheetName], requirements[sheet_type]['headerLineNum']);
                    evaluation[sheetName] = helpingFunctionFactory.overlapping(samples, sample_list);
                    break;  
                case 'MUT':
                    var headerLineNumber = requirements[sheet_type]['headerLineNum'];
                    var samples = helpingFunctionFactory.get_fieldValues(workbook.Sheets[sheetName], requirements[sheet_type]['headerLineNum'], 'SAMPLEID');
                    evaluation[sheetName] = helpingFunctionFactory.overlapping(samples, sample_list);
                    break;  
            }
        });
        return evaluation;
    },
    geneIDs_overlapping: function(workbook) {
        var evaluation = {};
        var hugo_genes = gene_mapping.map(g=>g.s);
        var hugo_alias = gene_mapping.map(g=>g.a);
        var hugo = hugo_genes.concat(hugo_alias);
        var gene_related_sheets = workbook.SheetNames.filter(sn=>['MATRIX', 'MUT', 'GENESETS'].indexOf(sn.split('-')[0]) > -1);
        gene_related_sheets.forEach(sheetName=>{
            var sheet_type = sheetName.split('-')[0];
            switch (sheet_type) {
                case 'MATRIX':
                    var genes = helpingFunctionFactory.get_colValues(workbook.Sheets[sheetName], requirements[sheet_type]['headerLineNum'], 'A');
                    evaluation[sheetName] = helpingFunctionFactory.overlapping(genes, hugo);
                    break;  
                case 'MUT':
                    var genes = helpingFunctionFactory.get_fieldValues(workbook.Sheets[sheetName], requirements[sheet_type]['headerLineNum'], 'GENES');
                    evaluation[sheetName] = helpingFunctionFactory.overlapping(genes, hugo);
                    break; 
                case 'GENESETS':
                    var obj = {};
                    var geneSetNames = helpingFunctionFactory.get_geneSetNames(workbook.Sheets[sheetName]);
                    geneSetNames.forEach(geneSet=>{
                        var rowValues = helpingFunctionFactory.get_rowValues(workbook.Sheets[sheetName], geneSetNames.indexOf(geneSet)+1);
                        rowValues.splice(0, 1);
                        var genes = rowValues;
                        obj[geneSet] = helpingFunctionFactory.overlapping(genes, hugo);
                    });
                    evaluation[sheetName] = obj;
                    break; 
            }
        });
        return evaluation;
    }
};

exports.xlsx2json = function(workbook) {
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

exports.json2S3 = function(jsonResult, projectID){
    var manifest = {};
    var files = [] ;
    var allURLs = jsonResult.forEach(j=>{
        var obj = {};
        var filename = projectID + '_' + j.name + '_' + 'json.gz';
        s3Factory.gzip_upload2S3_private(j.res, filename);
        
        obj['name'] = j.name;
        obj['dataType'] = j.type;
        obj['file'] = s3Factory.signURL(filename);
        files.push(obj);
    });
    manifest['files'] = files;
    var eventJSON = jsonResult.find(r=>r.type === 'EVENT');
    if(eventJSON !== undefined) { manifest['events'] = eventJSON.res.map; }
    var patientJSON = jsonResult.find(r=>r.type === 'PATIENT');
    if(patientJSON !== undefined) { manifest['fields'] = patientJSON.res.fields;}
    var schema = {
        'dataset' : 'name',
        'events' : '++, p',
        'patientSampleMap': 's, p',
        'patientMeta': 'key'
    };
    schema['patient'] = ['p'].concat(Object.keys(manifest['fields'])).join(',');
    jsonResult.filter(res=> res.type === 'MATRIX' || res.type === 'MUT').forEach(res=>{
        if(res.type === 'MATRIX') {
            schema[res.name] = 'm',
            schema[res.name+'Map'] = 's'
        } else {
            schema[res.name] = '++, m, p, t'
        }
    })
    manifest['schema'] = schema;
    var manifest_filename = projectID + '_manifest_json.gz';
    s3Factory.gzip_upload2S3_private(manifest, manifest_filename);       
    return s3Factory.signURL(manifest_filename);
};

exports.postUploading_file_level_checking = {
    manifest_existance: function() {},
    file_existance_against_manifest: function() {}
};

exports.postUploading_authorization_checking = {
    /* require access to MongoDB, .env
    https://github.com/canaantt/compressors/blob/master/basic_tests.js
    */
};



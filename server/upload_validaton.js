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
const _ = require('underscore');
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

exports.preUploading_sheetLevel_checking = function(sheet) {
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
}
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

exports.postUploading_file_level_checking = {
    manifest_existance: function() {},
    file_existance_against_manifest: function() {}
};

exports.postUploading_authorization_checking = {
    /* require access to MongoDB, .env
    https://github.com/canaantt/compressors/blob/master/basic_tests.js
    */
};



// Generic Functions
(function() {
  var Validator = (function() {
    validateSheet = (sheet, requirements, _, helper) => { 
      var err = {};
      var type = sheet.name.split('-')[0].toUpperCase();
      if('required_fields' in requirements[type]) {
          var header = helper.get_headers(sheet.data, 1);
          var requiredFields = requirements[type]['required_fields'];
          err['required_fields'] = helper.field_existence(header, requiredFields);
      }
      if('unique_fields' in requirements[type]) {
          var uniqueFields = requirements[type]['unique_fields']; 
          var e = {};
          uniqueFields.forEach(uniqueField=>{
              var headerLineNum = requirements[type]['headerLineNum'];
              var unique_field_values = helper.get_fieldValues(sheet.data, headerLineNum, uniqueField);
              e[uniqueField] = helper.check_uniqueness(unique_field_values);
          });
          err['unique_fields'] = e;
      } 
    //   if('sheet_specific_checking' in requirements[type]) {
    //       var e = {};
    //       requirements[type]['sheet_specific_checking'].forEach(functionName=>{
    //           e[functionName] = helper[functionName](sheet.data, _);
    //       });
    //       err['sheet_specific_checking'] = e;
    //   }
      return err;
    }

    validateWorkbook_allSheets_existance = (sheets, requirements, genemap, _, helper) => { 
        var obj = {};
        var permissible_sheetTypes = ['PATIENT', 'SAMPLE', 'EVENT', 'GENESETS', 'MATRIX', 'MUTATION'];
        var sheetsSet = new Set(sheets.map(n=>n.name.split('-')[0].toUpperCase()));

        obj['permissible_sheets'] = permissible_sheetTypes.map(s=> {
            var o = {};
            var sheetNames = sheets.filter(n=>n.name.split('-')[0].toUpperCase().indexOf(s)>-1);
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
    }

    validateWorkbook_patientID_overlapping = (sheets, requirements, genemap, _, helper) => {
        var evaluation = {};
        var headerLineNum = requirements['PATIENT']['headerLineNum'];
        var uniqueField = 'PATIENTID';
        var patient_sheet = sheets.find(n=>n.name.toUpperCase()==='PATIENT');
        var pt_list = helper.get_fieldValues(patient_sheet.data, headerLineNum, uniqueField);
        
        var pt_related_sheets = sheets.filter(s=>['SAMPLE', 'EVENT'].indexOf(s.name.toUpperCase().split('-')[0]) > -1);
        pt_related_sheets.forEach(sheet=>{
            var sheet_type = sheet.name.toUpperCase().split('-')[0];
            var headerLineNumber = requirements[sheet_type]['headerLineNum'];
            var uniqueField = 'PATIENTID';
            var pts = helper.get_fieldValues(sheet.data, headerLineNumber, uniqueField);
            evaluation[sheet.name] = helper.overlapping(pts, pt_list);    
        });
        return evaluation;
    }

    validateWorkbook_sampleID_overlapping = (sheets, requirements, genemap, _, helper) => {
        var evaluation = {};
        var headerLineNum = requirements['SAMPLE']['headerLineNum'];
        var uniqueField = 'SAMPLEID';
        var sample_sheet = sheets.find(n=>n.name.toUpperCase() === 'SAMPLE');
        var sample_list = helper.get_fieldValues(sample_sheet.data, headerLineNum, uniqueField);
        var sample_related_sheets = sheets.filter(s=>['MATRIX', 'MUTATION'].indexOf(s.name.toUpperCase().split('-')[0]) > -1);
        sample_related_sheets.forEach(sheet=>{
            var sheet_type = sheet.name.split('-')[0];
            switch (sheet_type) {
                case 'MATRIX':
                    var samples = helper.get_rowValues(sheet.data, requirements[sheet_type]['headerLineNum']);
                    evaluation[sheet.name] = helper.overlapping(samples, sample_list);
                    break;  
                case 'MUTATION':
                    var headerLineNumber = requirements[sheet_type]['headerLineNum'];
                    var samples = helper.get_fieldValues(sheet.data, requirements[sheet_type]['headerLineNum'], 'SAMPLEID');
                    evaluation[sheet.name] = helper.overlapping(samples, sample_list);
                    break;  
            }
        });
        return evaluation;
    }

    validateWorkbook_geneIDs_overlapping =  (sheets, requirements, genemap, _, helper) => {
        var evaluation = {};
        var hugo_genes = genemap.map(g=>g.s);
        var hugo_alias = genemap.map(g=>g.a);
        var hugo = hugo_genes.concat(hugo_alias);
        var gene_related_sheets = sheets.filter(s=>['MATRIX', 'MUTATION', 'GENESETS'].indexOf(s.name.toUpperCase().split('-')[0]) > -1);
        gene_related_sheets.forEach(sheet=>{
            var sheet_type = sheet.name.toUpperCase().split('-')[0];
            switch (sheet_type) {
                case 'MATRIX':
                    var genes = helper.get_colValues(sheet.data, requirements[sheet_type]['headerLineNum'], 'A');
                    evaluation[sheet.name] = helper.overlapping(genes, hugo);
                    break;  
                case 'MUTATION':
                    console.log('MUTATION, validateWorkbook_geneIDs_overlapping');
                    var genes = helper.get_fieldValues(sheet.data, requirements[sheet_type]['headerLineNum'], 'HGNCID');
                    evaluation[sheet.name] = helper.overlapping(genes, hugo);
                    break; 
                case 'GENESETS':
                    var obj = {};
                    var geneSetNames = helper.get_geneSetNames(sheet.data);
                    console.log(geneSetNames);
                    geneSetNames.forEach(geneSet=>{
                        var colValues = helper.get_fieldValues(sheet.data, requirements["GENESETS"]["headerLineNum"], geneSet);
                        var genes = colValues;
                        obj[geneSet] = helper.overlapping(genes, hugo);
                    });
                    evaluation[sheet.name] = obj;
                    break; 
            }
        });
        return evaluation;
    }

    // validateWorkbook_all = (sheets, requirements, genemap, _, helper) => {
    //   var error = {};
    //   error['allSheets_existance'] = validateWorkbook_allSheets_existance(sheets, requirements, genemap, _, helper);
    //   error['patientID_overlapping'] = validateWorkbook_patientID_overlapping(sheets, requirements, genemap, _, helper);
    //   error['sampleID_overlapping'] = validateWorkbook_sampleID_overlapping(sheets, requirements, genemap, _, helper);
    //   error['geneIDs_overlapping'] = validateWorkbook_geneIDs_overlapping(sheets, requirements, genemap, _, helper);
    //   return error;
    // }
    
    
    return {
        validateSheet: validateSheet,
        validateWorkbookPatientIDOverlapping: validateWorkbook_patientID_overlapping,
        validateWorkbookSampleIDOverlapping: validateWorkbook_sampleID_overlapping,
        validateWorkbookGeneIDsOverlapping: validateWorkbook_geneIDs_overlapping,
        validateWorkbookExistence: validateWorkbook_allSheets_existance
    };
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Validator;
  else
    window.Validator = Validator;

})();

// Generic Functions
(function() {
    var Serializer = (function() {
   
      serializeSheet = (sheet, _, XLSX) => { 
          var meta = {
            type : sheet.name.split('-')[0].toUpperCase(),
            header: null
          };
          var data = XLSX.utils.sheet_to_json(sheet.data, {header:1, raw:true});
          if(meta.type === 'PATIENT') {
              meta.header = data[0];
              data.splice(0, 1);
              meta.data = data.filter(d=>d.length!==0);
              var obj = {};
              var res = {};
              var ids = meta.data.map(d=>d[0]);
              var fields = {};
              var loc = Object.keys(sheet.data).filter(k=>k[1]=='1'&& k.length==2&&sheet.data[k].t!=='z');
              console.log(loc);
              var colTypes = loc.map(c=>{
                  var row = 2;
                  while (typeof(sheet.data[c[0]+row]) !== 'undefined' &&  sheet.data[c[0]+row].t === 'z') {
                    // console.log(sheet.data[c[0]+row]);
                    row++;
                  }
                  row--;
                  return sheet.data[c[0]+row].t;
              });
              loc.forEach(function(l, i){
                  var v;
                  if(colTypes[i] === 'n') {
                      var string2float = meta.data.map(d=>parseFloat(d[i]));
                      v = {
                          'min' : _.min(string2float),
                          'max' : _.max(string2float)
                      }
                  } else {
                      v = _.uniq(meta.data.map(d=>d[i]));
                      if(v.indexOf(undefined) > -1) {
                          v.splice(v.indexOf(undefined), 1);
                      }
                  }
                  fields[meta.header[i]] = v;
              });
              res.ids = ids;
              res.fields = _.omit(fields, Object.keys(fields)[Object.keys(fields).map(f=>f.toUpperCase()).indexOf('PATIENTID')]);
              // #region remove patientID column from original data
              var headercopy = meta.header;
              var omitloc1 = headercopy.map(h=>h.toUpperCase()).indexOf('PATIENTID');
              headercopy.splice(omitloc1, 1);
              meta.data.forEach(d=>{
                  d.splice(omitloc1, 1);
              });
              colTypes.splice(omitloc1, 1);
              // #endregion remove patientID column from original data
              res.value = meta.data.map(d=>{
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
              obj.type = meta.type;
              obj.name = sheet.name;
              return obj;
          } else if (meta.type === 'SAMPLE') {
              var result = [];
              meta.header = data[0];
              data.splice(0, 1);
              meta.data = data;
              // #region Patient-Sample Mapping
              var sampleIDLocation = meta.header.map(n=>n.toUpperCase()).indexOf('SAMPLEID');
              var patientIDLocation = meta.header.map(n=>n.toUpperCase()).indexOf('PATIENTID');
              var keys = _.uniq(data.map(d=>d[patientIDLocation]));
              var patientSampleMapping = {};
              keys.forEach(k=>{
                  patientSampleMapping[k] = data.filter(d=>d[patientIDLocation]===k)
                                              .map(d=>d[sampleIDLocation]);
              });
              var obj = {};
              obj.type = 'PSMAP';
              obj.name = 'PSMAP';
              obj.res = patientSampleMapping;
              result.push(obj);
              // #endregion Patient-Sample Mapping
              
              // #region Sample Annotation
              var obj = {};
              var res = {};
              var ids = data.map(d=>d[0]);
              var fields = {};
              var loc = Object.keys(sheet.data).filter(k=>k[1]=='1'&& k.length==2&&sheet.data[k].t!=='z');
              var colTypes = loc.map(c=>{
                  var row = 2;
                  while (sheet.data[c[0]+row].t === 'z') {
                      row++;
                  }
                  return sheet.data[c[0]+row].t;
              });
              loc.forEach(function(l, i){
                  var v;
                  if(colTypes[i] === 'n') {
                      var string2float = meta.data.map(d=>parseFloat(d[i]));
                      v = {
                          'min' : _.min(string2float),
                          'max' : _.max(string2float)
                      }
                  } else {
                      v = _.uniq(meta.data.map(d=>d[i]));
                      if(v.indexOf(undefined) > -1) {
                          v.splice(v.indexOf(undefined), 1);
                      }
                  }
                  fields[meta.header[i]] = v;
              });
              fields = _.omit(fields, Object.keys(fields)[Object.keys(fields).map(f=>f.toUpperCase()).indexOf('PATIENTID')], 
                                      Object.keys(fields)[Object.keys(fields).map(f=>f.toUpperCase()).indexOf('SAMPLEID')]);
              res.ids = ids;
              res.fields = fields;
              var headercopy = meta.header;
              var omitloc1 = headercopy.map(h=>h.toUpperCase()).indexOf('PATIENTID');
              headercopy.splice(omitloc1, 1);
              var omitloc2 = headercopy.map(h=>h.toUpperCase()).indexOf('SAMPLEID');
              headercopy.splice(omitloc2, 1);
              meta.data.forEach(d=>{
                  d.splice(omitloc1, 1);
                  d.splice(omitloc2, 1);
              });
              colTypes.splice(omitloc1, 1);
              colTypes.splice(omitloc2, 1);
              res.value = meta.data.
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
              obj.type = meta.type;
              obj.name = sheet.name;
              result.push(obj);
              // #endregion Sample Annotation
              return result;
          } else if (meta.type === 'EVENT') {
              meta.header = data[0];
              data.splice(0, 1);
              var obj = {};
              var res = {};
              var map = {};
              var headerUpperCase = meta.header.map(n=>n.toUpperCase());
              var patientIDLocation = headerUpperCase.indexOf('PATIENTID');
            //   var categoryLocation = headerUpperCase.indexOf('CATEGORY');
            //   var typeLocation = headerUpperCase.indexOf('TYPE');
              var category = sheet.name.split('-')[1].toUpperCase();
              map['category'] = category;
              var type; 
              if (sheet.name.split('-').length > 2) {
                  type = sheet.name.split('-')[2].toUpperCase();
                  map['type'] = type;
              }
              var startDateLocation = headerUpperCase.indexOf('START');
              var endDateLocation = headerUpperCase.indexOf('END');
              var reservedHeaderLocations = [patientIDLocation, startDateLocation, endDateLocation];
              var customHeaders = meta.header.filter((h, i)=>reservedHeaderLocations.indexOf(i) === -1);

            //   var uniqueTypes = _.uniq(data.map(d=>d[typeLocation]));
            //   uniqueTypes.forEach(t=>{
            //       map[t]=data.find(d=>d[typeLocation]===t)[categoryLocation];
            //   });
              var value = data.map(d=>{
                  var arr = [];
                  arr[0] = d[0];
                //   arr[1] = uniqueTypes.indexOf(d[typeLocation]);
                  if (typeof(type) !== 'undefined') {
                    arr[1] = type;
                  } else {
                    arr[1] = category;
                  }
                  arr[2] = parseInt(d[startDateLocation]);
                  arr[3] = parseInt(d[endDateLocation]);
                  var o = {};
                  customHeaders.forEach(h=>{
                      o[h] = d[meta.header.indexOf(h)];
                  });
                  arr[4] = o;
                  return arr;
              });
              res.map = map;
              res.value = value;
              obj.res = res;
              obj.type = meta.type;
              obj.name = sheet.name;
              return obj;
          } else if (meta.type === 'GENESETS') {
              var genesets = {};
              var genesetNames = data[0];
              data.splice(0, 1);
              genesetNames.forEach((k,i)=>{
                genesets[k] = _.compact(data.map(d=>d[i]));
              });
              var obj = {};
              obj.type = meta.type;
              obj.name = sheet.name;
              obj.res = genesets;
              return obj;
          } else if (meta.type === 'MUTATION') {
              var obj = {};
              var res = {};
              meta.header = data[0].map(n=>n.toUpperCase());
              data.splice(0, 1);
              var ids = _.uniq(data.map(d=>d[meta.header.indexOf('SAMPLEID')]));
              var genes = _.uniq(data.map(d=>d[meta.header.indexOf('HGNCID')]));
              var mutTypes = _.uniq(data.map(d=>d[meta.header.indexOf('TYPE')]));
              var values = data.map((d)=>{
                  return(ids.indexOf(d[1]) + '-' +
                         genes.indexOf(d[0]) + '-' +
                         mutTypes.indexOf(d[2]));
              });
              res.ids = ids;
              res.genes = genes;
              res.mutationTypes = mutTypes;
              res.values = values;
              obj.res = res;
              obj.type = meta.type;
              if(sheet.name.split('-').length > 1){
                obj.name = sheet.name.split('-')[1].toUpperCase();
              } else {
                obj.name = 'MUTATION';
              }
              return obj;
          } else if (meta.type === 'MATRIX') {
              var obj = {};
              var res = {};
              data[0].splice(0,1);
              var ids = data[0];
              var genes = data.map(d=>d[0]);
              var values = data.map(d=>{
                  d.splice(0, 1);
                  return d.map(dd=>parseFloat(dd))
              });
              res.ids = ids;
              res.genes = genes;
              res.values = values;
              obj.res = res;
              obj.type = sheet.name.split('-')[1].toUpperCase();
              obj.name = sheet.name.split('-')[2].toUpperCase();
              return obj;
          }
      }
  
      serializeManifest = (sheetsSerialized, uploadResults) => { 
        var manifest = {};
        manifest['files' ]= uploadResults;
        var eventJSON = sheetsSerialized.find(r => r.type === 'EVENT');
        if(eventJSON !== undefined) { manifest['events'] = eventJSON.res.map; }
        var patientJSON = sheetsSerialized.find(r => r.type === 'PATIENT');
        if(patientJSON !== undefined) { manifest['fields'] = patientJSON.res.fields;}
        var sampleJSON = sheetsSerialized.find(r => r.type === 'SAMPLE');
        
        var schema = {
            'dataset' : 'name',
            'events' : '++, p',
            'patientSampleMap': 's, p',
            'patientMeta': 'k', 
            'sampleMeta': 'k',
            'geneset': 'n', 
            'cohort': 'n'
        };
        schema['patient'] = ['p'].concat(Object.keys(manifest['fields'])).join(',');
        if(sampleJSON != undefined) {
            schema['sample'] = ['s'].concat(Object.keys(sampleJSON.res.fields)).join(',');
        }
        sheetsSerialized.filter(res => res.type === 'MATRIX' || res.type === 'MUT').forEach(res => {
            if(res.type === 'MATRIX') {
                schema[res.name] = 'm',
                schema[res.name+'Map'] = 's'
            } else {
                schema[res.name] = '++, m, p, t'
            }
        })
        manifest['schema'] = schema;
        return manifest
      }
      
      return {
          sheet: serializeSheet,
          manifest: serializeManifest
      };
    })();
  
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
      module.exports = Serializer;
    else
      window.Serializer = Serializer;
  
  })();
  
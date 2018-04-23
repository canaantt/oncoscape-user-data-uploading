// Node Specific


// Generic Functions
(function() {
    var s3Factory = {
      gzip_upload2S3_private: function(JSONOBJ, FILENAME, s3UploadConfig, s3, zlib){
          zlib.gzip(JSON.stringify(JSONOBJ), level=9, function(err, result){
              s3.putObject({Bucket: s3UploadConfig.params.Bucket, 
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
      signURL: function(FILENAME, s3){
          var params = { Bucket: 'oncoscape-users-data', 
                        Key: FILENAME, 
                        Expires: 15552000}; // url expires in 180 Days
          return s3.getSignedUrl('getObject', params);
      }
    }

    var Save = (() => {
   
      server = (sheetSerialized, projectID, s3UploadConfig, AWS, s3, zlib) => { 
        var result = {};
        var filename = projectID + '_' + sheetSerialized.name + '_' + Date.now() + 'json.gz';
        s3Factory.gzip_upload2S3_private(sheetSerialized.res, filename, s3UploadConfig, s3, zlib);
        
        result['name'] = sheetSerialized.name;
        result['dataType'] = sheetSerialized.type;
        result['file'] = s3Factory.signURL(filename, s3);
        return result; 
      }

      local = (sheetSerialized, projectID) => {
        var result = {};
        var filename = projectID + '_' + sheetSerialized.name + '.json';
        result['name'] = sheetSerialized.name;
        result['dataType'] = sheetSerialized.type;
        result['file'] = filename;
        return result; 
      }

      toS3 = (manifestSerialized, projectID, s3UploadConfig, AWS, s3, zlib) => { 
        var filename = projectID + '_' + Date.now() + 'manifest_json.gz';
        s3Factory.gzip_upload2S3_private(manifestSerialized, filename, s3UploadConfig, s3, zlib);
        return s3Factory.signURL(filename, s3);
      }

      return {
        server: server,
        local: local,
        toS3: toS3
      };
    })();
  
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
      module.exports = Save;
    else
      window.Save = Save;
  
  })();
  
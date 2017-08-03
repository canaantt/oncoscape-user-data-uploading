const express = require('express');
// const fileUpload = require('express-fileupload');
const mongoose = require('mongoose'); 
const _ = require("underscore");
const validFileTypes = ['txt', 'csv', 'tsv', 'json'];
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
const tsv = require("node-tsv-json");
var path = require('path');
var multer = require('multer');

router.use(bodyParser.urlencoded({ extended: true }));
// router.use(fileUpload());

// router.post('/', function(req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   var file= req.files.sampleFile;
//   if (validFileTypes.indexOf(_.last(file.name.split("."), 1)[0]) == -1){
//     return res.status(400).send('File type is not valid.');
//   } else{
//     var fileUploadingDir = '/Users/jennyzhang/Desktop/canaantt/NG2-mongoose-express/tmp/';
//     var filePath = fileUploadingDir.concat(file.name);
    
//     file.mv(filePath, function(err) {
//       if (err)
//         return res.status(500).send(err);
//       res.send('File uploaded!');
//     });
//   }
// });

router.post('/', function(req, res){
	upload(req, res, function (err) {
			if (err) {
				res.json({ error_code: 1, err_desc: err });
				return;
			} else {
                console.dir(res.req.file);
                res.setHeader("Content-Type", "text/html");
                tsv({
                        input: res.req.file.path,
                        output: null,
                        parseRows: true
                    }, function(err, result) {
                        if(err) {
                        console.error(err);
                        }else {
                        console.log(res.req.file.path);
                        console.log(result);
                        res.json({data: result }).end();
                    }
                });
            }
			// res.json({ error_code: 0, err_desc: null });
		});
});

router.get('/:filename', function(req, res){	
        Model.find({}, processResult(req,res) );
    });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //cb(null, file.fieldname + '-' + Date.now())
    var newFileName = file.fieldname + '-' + Date.now();
    cb(null, newFileName);
    // cb(tsvParser('./uploads/' + newFileName), newFileName);
  }
})
var upload = multer({
	storage: storage, 
    preservePath: true
}).single('file');

module.exports = router;

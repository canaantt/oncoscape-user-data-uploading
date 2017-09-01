const express = require('express');
const { fork } = require('child_process');
const request = require('request');
const _ = require("underscore");
const cors = require('cors');
const mongoose = require('mongoose');
const asyncLoop = require('node-async-loop');
const nodemailer = require('nodemailer');
// const tsv = require("node-tsv-json");
// const csv=require('csvtojson');
// var convertExcel = require('excel-as-json').processFile;
var XLSX =require("xlsx");
// var excelParser = require('excel-parser');
const fs = require("fs");
var path = require('path');
var jsonfile = require("jsonfile");
var multer = require('multer');
var bodyParser = require('body-parser'); //parses information from POST
var filebrowser = require('file-browser');
var User = require("./models/user");
var Project = require("./models/project");
var File = require("./models/file");
var IRB = require("./models/irb");
var Permission = require("./models/permission");
// var GeneSymbolLookupTable = require('dev-lookup_oncoscape_genes.json');
var GeneSymbolLookupTable;
var HugoGenes;

request('http://dev.oncoscape.sttrcancer.io/api/lookup_oncoscape_genes/?q=&apikey=password', function(err, resp, body){
    GeneSymbolLookupTable = JSON.parse(body);
    HugoGenes = GeneSymbolLookupTable.map(function(m){return m.hugo;});
    jsonfile.writeFile("HugoGenes.json", HugoGenes, {spaces: 2}, function(err){ console.error(err);});  
    if(err) console.log(err);
    console.log("**********");
    console.log(HugoGenes.length);
});

const corsOptions = {
	origin: ['http://localhost:4200','http://localhost:8080']
}
mongoose.connect("mongodb://localhost:27017/mydb");
var db = mongoose.connection;
// Grid.mongo = mongoose.mongo;
// var gfs = Grid(db.db);
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jennylouzhang@gmail.com',
      pass: 'oncoscape'
    }
  });
  
function processResult(req, res, next , query){
    return function(err, data){
        if (err) {
            console.log(err);
            res.status(404).send("Not Found").end();
        }else{
            res.json(data).end();
        }
    };
};

function routerFactory(Model)
{
    var router = express.Router();
    router.use(bodyParser.json()); 
    router.use(bodyParser.urlencoded({ extended: true }));

    router.get('/', function(req, res){	
        Model.find({}, processResult(req,res));
    });
    router.post('/', function(req, res) {
        Model.create(req.body, processResult(req,res));
    });
    router.route('/:id')
    .get(function(req, res){
        Model.findById(req.params.id, processResult(req,res));
    })
    .put(function(req, res){
        Model.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: false}, processResult(req,res));
    })
    .delete(function(req, res){
        Model.remove({_id: req.params.id}, processResult(req,res));
    });
    return router;
}

function fileRouterFactory(){
    var router = express.Router();
    var projectCollections;
    router.use(bodyParser.json()); 
    router.use(bodyParser.urlencoded({ extended: true }));
    router.get('/', function(req, res){	
        console.log("in Files");
        res.status(200).end();
    });
    router.post('/', function(req, res) {
        console.log("in post");
    });
    router.route('/:id')
    .get(function(req, res){
        console.log("Getting Project-Related Collections...");
        console.log(req.params.id);
        var projectID = req.params.id;
        db.db.listCollections().toArray(function(err, collectionMeta) {
            if (err) {
                console.log(err);
            }
            else {
                projectCollections = collectionMeta.map(function(m){
                    return m.name;
                }).filter(function(m){
                    return m.indexOf(projectID) > -1;
                });
                
                if(projectCollections.length === 0){
                    // res.status(404).send("Not Found").end();
                    res.send('Not Find').end();
                } else {
                    var arr = [];

                    asyncLoop(projectCollections, function(m, next){ 
                        db.collection(m).find().toArray(function(err, data){
                            var obj = {};
                            obj.collection = m;
                            if(m.indexOf("clinical") > -1){
                                obj.category = "clinical";
                                obj.patients = data.map(function(m){return m.id});
                                obj.metatdata = data[0].metadata;
                                obj.enums_fields = data.map(function(m){return Object.keys(m.enums);})
                                                    .reduce(function(a, b){return a = _.uniq(a.concat(b));});
                                obj.nums_fields = data.map(function(m){return Object.keys(m.nums);})
                                                    .reduce(function(a, b){return a = _.uniq(a.concat(b));});               
                                obj.time_fields = data.map(function(m){return Object.keys(m.time);})
                                                    .reduce(function(a, b){return a = _.uniq(a.concat(b));});   
                                obj.boolean_fields = data.map(function(m){return Object.keys(m.boolean);})
                                                    .reduce(function(a, b){return a = _.uniq(a.concat(b));});                                                                     
                                arr.push(obj);
                            } else if (m.indexOf("molecular") > -1) {
                                obj.category = "molecular";
                                var types = _.uniq(data.map(function(m){return m.type}));
                                types.forEach(function(n){
                                    obj[n] = {};
                                    typeObjs = data.filter(function(v){return v.type === n});
                                    obj[n].markers = typeObjs.map(function(v){return v.marker});
                                    obj[n].patients = _.uniq(typeObjs.map(function(v){return Object.keys(v.data);})
                                                                    .reduce(function(a, b){return a = _.uniq(a.concat(b));}));
                                });
                                arr.push(obj);
                            } else {
                                arr.push(data);
                            }
                            next();
                        });
                        
                    }, function(err){
                        if(err){
                            console.log(err);
                            res.status(404).send(err).end();
                        } else {
                            res.json(arr).end();
                        }    
                        
                    });
                    
                }  
            }
        });
    }).delete(function(req, res){
        console.log("in delete");
        console.log(req.params.id);
        var projectID = req.params.id;
        db.db.listCollections().toArray(function(err, collectionMeta) {
            if (err) {
                console.log(err);
            }
            else {
                collectionMeta.map(function(m){
                    return m.name;
                }).filter(function(m){
                    return m.indexOf(projectID) > -1;
                }).forEach(function(m){
                    db.db.dropCollection(m,function(err, result) {
                        console.log("DELETING", m);
                        if(err) console.log(err);
                        console.log(result);
                    });
                });
            }
        });
        res.status(200).send("files are deleted").end();
    });
    return router;
}
function camelToDash(str) {
      return str.replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                .replace("-", "_")
                .toLowerCase();
   }
var app = express();
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(bodyParser.urlencoded({limit: '400mb'}));
app.use(bodyParser.json({limit: '400mb'}));
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
	console.log("Connection succeeded.");
	app.use(cors(corsOptions));
	app.use('/users', routerFactory(User));
	app.use('/projects', routerFactory(Project));
	app.use('/files', fileRouterFactory());
	app.use('/irbs', routerFactory(IRB));
	app.use('/permissions', routerFactory(Permission));
	app.post('/upload/:id/:email', function (req, res) {
        console.log(req.params.id);
        var projectID = req.params.id;
        var userEmail = req.params.email;
        console.log('##################### user: ', userEmail);
        var mailOptions = {
            from: 'jennylouzhang@gmail.com',
            to: userEmail,
            subject: 'Notification from Oncoscape Data Uploading App',
            text: 'Data are in database, ready to share.'
          };
        var molecularColleciton = mongoose.model(projectID + "_data_molecular", File.schema);
        var sampleMapCollection = mongoose.model(projectID + "_data_samples", File.schema);
        var clinicalColleciton = mongoose.model(projectID + "_data_clinical", File.schema);
        var uploadingSummaryCollection = mongoose.model(projectID + "_uploadingSummary", File.schema);
		upload(req, res, function (err) {
            console.log("This section is triggered");
			if (err) {
                console.log(err);
				return;
			} else {
                const writing2Mongo = fork('server/fileUpload.js', 
                { execArgv: ['--max-old-space-size=4096']});
                console.log('test***');
                writing2Mongo.send({filePath: res.req.file.path, projectID: projectID });
                console.log('test@@@');
                writing2Mongo.on('message', () => {
                    res.end('Writing is done');
                    console.log("*********************!!!!!!!********************");
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                });
            }
		});
        res.status(200).end();
	});
    app.use('/upload/', express.static('./uploads'));
	app.listen(3000, function () {
		console.log('listening on 3000...');
	});
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    var newFileName = file.fieldname + '-' + Date.now() + '.xlsx';
    cb(null, newFileName);
  }
})
var upload = multer({
	storage: storage, 
    preservePath: true
}).single('file');

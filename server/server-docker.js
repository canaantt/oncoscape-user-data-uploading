const express = require('express');
const { fork } = require('child_process');
const request = require('request');
const _ = require("underscore");
const cors = require('cors');
const mongoose = require('mongoose');
const asyncLoop = require('node-async-loop');
const nodemailer = require('nodemailer');
const fs = require("fs");

const corsOptions = {
	origin: ['http://localhost:4200', 'http://localhost:8088','https://localhost:4200']
}

var XLSX =require("xlsx");
var path = require('path');
var jsonfile = require("jsonfile");
var multer = require('multer');
var bodyParser = require('body-parser'); //parses information from POST
var filebrowser = require('file-browser');

var USER = require("./models/user");
var PROJECT = require("./models/project");
var FILE = require("./models/file");
var IRB = require("./models/irb");
var PERMISSION = require("./models/permission");

// var GeneSymbolLookupTable;
// var HugoGenes;

// request('http://dev.oncoscape.sttrcancer.io/api/lookup_oncoscape_genes/?q=&apikey=password', function(err, resp, body){
//     GeneSymbolLookupTable = JSON.parse(body);
//     HugoGenes = GeneSymbolLookupTable.map(function(m){return m.hugo;});
//     jsonfile.writeFile("HugoGenes.json", HugoGenes, {spaces: 2}, function(err){ console.error(err);});  
//     if(err) console.log(err);
//     console.log("**********");
//     console.log(HugoGenes.length);
// });

/////////////////
// Define Connections
mongoose.connect(
     "mongodb://oncoscape-dev-db1.sttrcancer.io:27017,oncoscape-dev-db2.sttrcancer.io:27017,oncoscape-dev-db3.sttrcancer.io:27017/v2?authSource=admin",{
    //process.env.MONGO_CONNECTION, {  
    db: {
        native_parser: true
    },
    server: {
        poolSize: 5,
        reconnectTries: Number.MAX_VALUE
    },
    replset: {
        rs_name: 'rs0'
    },
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD
});

var db = mongoose.connection;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oncoscape.sttrcancer@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });
  
// Helper functions
function camelToDash(str) {
    return str.replace(/\W+/g, '-')
              .replace(/([a-z\d])([A-Z])/g, '$1-$2')
              .replace("-", "_")
              .toLowerCase();
}

// Handle Routes 
function processResult(req, res, next, query){
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
    router.route('/:id').get(function(req, res){
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
        console.log("File Router get");
        res.status(200).end();
    });
    router.post('/', function(req, res) {
       console.log("File Router post");
    });
    router.route('/:id').get(function(req, res){
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
                
                // get all projects associated with ID
                if(projectCollections.length === 0){
                    res.status(404).send("No Project Collections Found").end();
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
        var projectID = req.params.id;
        console.log("Delete project: " + projectID);
        
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
        res.status(200).send("Project Deleted").end();
    });
    return router;
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
	app.use('/users', routerFactory(USER));
	app.use('/projects', routerFactory(PROJECT));
	app.use('/files', fileRouterFactory(FILE));
	app.use('/irbs', routerFactory(IRB));
	app.use('/permissions', routerFactory(PERMISSION));
    
    app.post('/upload/:id/:email', function (req, res) {
        
        var projectID = req.params.id;
        var userEmail = req.params.email;
        console.log('##################### user: ', userEmail);
        var mailOptions = {
            from: 'oncoscape.sttrcancer@gmail.com',
            to: userEmail,
            subject: 'Oncoscape Data upload complete',
            text: 'You can now view your private data at oncoscape.sttrcancer.org'
          };
        var molecularColleciton = mongoose.model(projectID + "_data_molecular", File.schema);
        var sampleMapCollection = mongoose.model(projectID + "_data_samples", File.schema);
        var clinicalColleciton = mongoose.model(projectID + "_data_clinical", File.schema);
        var uploadingSummaryCollection = mongoose.model(projectID + "_uploadingSummary", File.schema);
        
        upload(req, res, function (err) {
            console.log("Upload Project to Database");
			if (err) {
                console.log(err);
				return;
			} else {
                const writing2Mongo = fork('/usr/src/app/server/fileUpload.js', 
                { execArgv: ['--max-old-space-size=1000']});
                writing2Mongo.send({ filePath: res.req.file.path, 
                                     projectID: projectID
                                  });
                // const writing2Mongo = fork('server/fileUpload.js', 
                // { execArgv: ['--max-old-space-size=4096']});
                // console.log('test***');
                // writing2Mongo.send({filePath: res.req.file.path, projectID: projectID });
                  
                writing2Mongo.on('message', () => {
                    res.end('Database Write Complete');
                    console.log('Database Write Complete.');
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log('Email NOT sent: ' + error);
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
    //app.listen(3000, function () {
    app.listen(process.env.NODE_PORT, function () {
		console.log('listening on 3000...');
	});
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, '/usr/src/app/uploads')
     //cb(null, './uploads')
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

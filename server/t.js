// const cluster = require('cluster');
// console.log(cluster.isMaster);
const {fork} = require('child_process');
const writing2Mongo = fork('/server/fileUpload.js',
                    { execArgv: ['--max-old-space-size=4000']});
writing2Mongo.send({ filePath: req.file.path, 
                         projectID: projectID
                      });
console.log('Hello');
const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';
const port  = 8000;
let indexName = "/index.html";
let indexFile;
let cssName = "/style.css";
let cssFile;
let appName = "/dist/app.js";
let appFile;
let enterName = "/dist/enter.js";
let enterFile;

fs.readFile(__dirname + indexName)
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`HTML ready. Server is running on http://${host}:${port}.`);
        });
    })
    .catch(err => {
        console.error(`Could not read ${indexName} file: ${err}`);
        process.exit(1);
    })
;
fs.readFile(__dirname + cssName)
    .then(contents => {
        cssFile = contents;
        server.listen(port, host, () => {
            console.log(`CSS ready.`);
        });
    })
    .catch(err => {
        console.error(`Could not read ${cssName} file: ${err}`);
        process.exit(1);
    })
;
fs.readFile(__dirname + appName)
    .then(contents => {
        appFile = contents;
        server.listen(port, host, () => {
            console.log(`App ready.`);
        });
    })
    .catch(err => {
        console.error(`Could not read ${appName} file: ${err}`);
        process.exit(1);
    })
;
fs.readFile(__dirname + enterName)
    .then(contents => {
        enterFile = contents;
        server.listen(port, host, () => {
            console.log(`Enter ready.`);
        });
    })
    .catch(err => {
        console.error(`Could not read ${enterName} file: ${err}`);
        process.exit(1);
    })
;

const requestListener = function (req, res) {
    switch(req.url){
        case cssName:
            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(cssFile);
            console.log("CSSSSS");
            break;
        case appName:
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(appFile);
            console.log("appppppp");
            break;
        case enterName:
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(enterFile);
            console.log("enterrrrr");
            break;
        default:
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(indexFile);
            console.log("HHHHH");
    }
};

const server = http.createServer(requestListener);
var express = require('express');
var router = express.Router();
const fs = require('fs');

let resDataAsyncAwait = {};
let resDataThen = {};
let resDataCallback = {};
let resData = {};

(async function () {
  fs.readFile('./data-files/fileData.json', 'utf-8', (err, result) => {
    resDataCallback = result;
  })
})();

(async function () { 
  fs.promises.readFile('./data-files/fileData.json', 'utf-8').then((result) => {
    resDataThen = result;
  });
})();

(async function () {
  resDataAsyncAwait = await fs.promises.readFile('./data-files/fileData.json', 'utf-8');
})();

router.use("/asyncAwait", (req, res, next) => {
    res.set({
      "Content-Type": "text/plain",
      "Operation-Method": "Async Await"
    });
  
    resData = resDataAsyncAwait;
  
    next();
  })
  
  router.use("/asyncThen", (req, res, next) => {
    res.set({
      "Content-Type": "text/plain",
      "Operation-Method": "Async Then"
    });
  
    resData = resDataThen;
  
    next();
  })
  
  router.use("/callback", (req, res, next) => {
    res.set({
      "Content-Type": "text/plain",
      "Operation-Method": "Callback"
    });
  
    resData = resDataCallback;
  
    next();
  })
  
  router.use((req, res, next) => {
    res.status(200).send(resData);
  })

  module.exports = router;
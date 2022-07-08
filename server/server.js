let express = require('express');
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
let fs = require('fs');

let port = 23456;
let filePath = __dirname + '/file.txt';

/**
 * @function app.get
 * @description GET data
 * @Note Primarily for testing purposes here
 */
app.get('/', function (req, res) {
   res.send({status: 200, data: 'TESTING IS SOLID'});
});

/**
 * @function app.post
 * @description To ingest the body data, perform simple task
 * @returns JSON string
 */
app.post('/api/encode', (req, res) => {
   let err = false
   let s = ``;
   if (req.body) {
      let str = req.body.Message;
      num = (req.body.Shift) % 26;
      let lRange = ['a'.charCodeAt(), 'z'.charCodeAt()];
      let uRange = ['A'.charCodeAt(), 'Z'.charCodeAt()];
      for (var i = 0, iLen = str.length; i < iLen; i++) {
         if (str[i] === ' ') {
            s += str[i];
         } else {
            const charcode = (str[i].charCodeAt()) + num;
            if (str[i].toUpperCase() === str[i] && charcode > uRange[1]) {
               s += String.fromCharCode(charcode - 26).toUpperCase();
            } else {
               if (charcode > lRange[1]) {
                  s += String.fromCharCode(charcode - 26);
               } else {
                  s += String.fromCharCode(charcode);
               }
            }
         }
      }
   } else {
      err = !err;
   }
   fs.appendFile(filePath, s + ' \n', (e) => {
      console.log(e ? 'failed' : 'success')
   });
   res.send(err ? {status: 500} : {status: 200});
});

let server = app.listen(port, () => {
   console.log(`Listening on Port: ${port}`);
});
require('dotenv').config();
const path = require('path')
const fs = require('fs')
const express = require('express');
const app = new express();
const cors = require('cors');
const os = require('os');
const port = 3000;
const directoryPath = path.join(process.env.FILE_PATH)
const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	optionsSuccessStatus: 200
}

let recFiles = [];

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    console.log(err)
  } else {
    files.forEach(function(file) {
      recFiles.push(file);
    })
  }
})

app.get('/rcx', cors(corsOptions), function(request, response){
  response.json(recFiles);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
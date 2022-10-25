const gm = require('gm');
const express = require('express');
const app = express();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');


const scripts = require('./scripts');


// app.use(upload);


app.get('/', scripts.home);
app.post('/image', upload, scripts.handlefile);


const PORT = 5000;
app.listen(PORT, () => {
    console.log("listing on " + PORT);
})


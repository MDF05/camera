const express = require('express');
const app = express();
const route = express.Router();
const multer = require('multer');
const cors = require('cors');

const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}

app.use(cors(corsOption))

let countVideo = 0;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + countVideo)
    }
})
const upload = multer({ storage })

app.use(route)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public/"))



app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'test message asu jembut' })
})

app.post('/upload', upload.single('video'), (req, res) => {
    countVideo++;
    res.json({ status: 'ok', message: 'selamat berhasil diupload', data: req.file })
})

app.use('/', (req, res) => {
    res.json({ status: 'gagal' })
})

const port = process.env.PORT || 3000;
host = 'localhost'

app.listen(port, host, () => {
    console.log('listening on port 3000')
})
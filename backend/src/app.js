const express = require('express');
const multer = require('multer');

const port = 8080;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({ dest: 'uploads' });
const app = express();

app.post('/upload', upload.single('image'), function (req, res) {
    res.send("Image uploaded");
})
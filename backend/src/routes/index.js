const routes = require('express').Router();
const multer = require('multer');

//Image Storage
const uploadFolder = 'src/uploads';
const upload = multer({ dest: `${uploadFolder}` });

const checkImage = require('../services/checkImage');
const cloudUpload = require('../services/cloudUpload');

routes.post('/upload', upload.any('file'), (req, res) => {

    const data = JSON.parse(req.body.dimensions);
    const location = `${uploadFolder}/${req.files[0].filename}`;

    checkImage(location, (ok) => {
        if (!ok) {
            return;
        }
        cloudUpload(location, data, (result) => {
            console.log(result)
        })
    });

});

module.exports = routes;
const routes = require('express').Router();
const multer = require('multer');

const cloudinary = require('../services/cloudinary');
const { cloudUpload, checkImage } = cloudinary;

//Image Folder
const uploadFolder = 'src/uploads';
const upload = multer({ dest: `${uploadFolder}` });

//Upload Post
routes.post('/upload', upload.any('file'), (req, res) => {

    const data = JSON.parse(req.body.dimensions);
    const location = `${uploadFolder}/${req.files[0].filename}`;

    //Check image size
    checkImage(location, (ok) => {
        if (!ok) {
            res.status(400)
            res.send("please provide 1024x1024 image")
            return;
        }

        cloudUpload(location, data, (error, result) => {
            if (error) {
                console.error(error)
                res.status(500)
                res.send("we are facing a technical difficulty. please try after sometime")
                return;
            }
            res.send(result);
        })
    })
});

module.exports = routes;
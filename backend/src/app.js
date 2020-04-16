const express = require('express');
const multer = require('multer');
const cors = require('cors');
var sizeOf = require('image-size');
var cloudinary = require('cloudinary').v2


const app = express();

const port = 8080;

cloudinary.config({
    cloud_name: 'drq7szv1t',
    api_key: '592675378211415',
    api_secret: 'dEktIRRNiWwaDwOo-IQmGMAVFOQ'
})


//Image Storage
const uploadFolder = 'src/uploads';
const upload = multer({ dest: `${uploadFolder}` });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/upload', upload.any('file'), (req, res) => {
    res.send('Image Uploaded');

    const data = JSON.parse(req.body.dimensions);
    const horizontal = data['0'];
    const vertical = data['1'];
    const horizontalSmall = data['2'];
    const gallery = data['3'];

    //Check image size
    function checkImage() {
        const location = `${uploadFolder}/${req.files[0].filename}`;
        sizeOf(`${location}`, function (err, dimensions) {
            const width = 1024, height = 1024;
            if (dimensions.width != width && dimensions.height != height) {
                res.status(400);

                // res.send("Size not supported. Upload 1024x1024 images")
                console.log('Invalid Size');
                return;
            }

            cloudUpload(location);

            //Upload image to Cloud CDN
            function cloudUpload(src) {
                cloudinary.uploader.upload(`${src}`, {
                    eager: [
                        { x: `${Math.floor(horizontal.x)}`, y: `${Math.floor(horizontal.y)}`, width: `${Math.floor(horizontal.width)}`, height: `${Math.floor(horizontal.height)}` },
                        { x: `${Math.floor(vertical.x)}`, y: `${Math.floor(vertical.y)}`, width: `${Math.floor(vertical.width)}`, height: `${Math.floor(vertical.height)}` },
                        { x: `${Math.floor(horizontalSmall.x)}`, y: `${Math.floor(horizontalSmall.y)}`, width: `${Math.floor(horizontalSmall.width)}`, height: `${Math.floor(horizontalSmall.height)}` },
                        { x: `${Math.floor(gallery.x)}`, y: `${Math.floor(gallery.y)}`, width: `${Math.floor(gallery.width)}`, height: `${Math.floor(gallery.height)}` }
                    ]
                }, function (error, result) {
                    if (!error) {
                        res.send(result);
                    }
                });

            }


        });
    }

    checkImage();
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
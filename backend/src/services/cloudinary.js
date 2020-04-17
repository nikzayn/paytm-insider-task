//Modules
const dotenv = require('dotenv');
const _ = require('lodash');
var cloudinary = require('cloudinary').v2
var sizeOf = require('image-size');

dotenv.config()

//Cloudinary Credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//Image Check
function checkImage(location, callback) {
    sizeOf(`${location}`, function (err, dimensions) {
        const width = 1024, height = 1024;
        let result = true;
        if (dimensions.width != width && dimensions.height != height) {
            result = false;
        }
        callback(result);
    });
}

//Transforming images
function imageTransformation(data) {
    return _.map(data, (item) => ({
        x: Math.floor(item.x),
        y: Math.floor(item.y),
        width: Math.floor(item.width),
        height: Math.floor(item.height),
        crop: "crop"
    }))
}

//Uploading updated images to cloudinary server
function cloudUpload(src, data, callback) {
    cloudinary.uploader.upload(`${src}`, {
        eager: imageTransformation(data)
    }, (error, result) => {
        if (callback && callback instanceof Function) {
            callback(error, result)
        }
    });
}

module.exports = { cloudUpload, checkImage, }
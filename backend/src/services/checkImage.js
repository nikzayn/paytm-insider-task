var sizeOf = require('image-size');

//Check Image functionality will get dimensions from a file.
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

module.exports = checkImage;
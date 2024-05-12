const Image = require("../models/Image");


async function addImages(base64) {
    const newImage = new Image({
        url: `${base64}`,
    });
    const result = await newImage.save();
    console.log("addImages");
    return result;

}

module.exports = { addImages }
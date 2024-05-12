const Image = require("../models/Image");


async function addImages(base64) {
    const newImage = new Image({
        url: `${base64}`,
    });
    const result = await newImage.save();
    console.log("addImage");
    return result;

}

async function getAllImagesFetch() {
    const images = await Image.find();
    return images;
}

async function deleteImageFetch(id) {
    const image = await Image.findByIdAndDelete(id);
    return image;
}

module.exports = { addImages, getAllImagesFetch, deleteImageFetch }
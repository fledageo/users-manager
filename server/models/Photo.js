const { Schema, model } = require("mongoose");

const Photo = new Schema({
    data: {type:Buffer},
    contentType: {type:String}
})

module.exports = model('photo', Photo)
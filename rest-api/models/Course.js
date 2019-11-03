const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author : {
        type : String,
        required : true,
    },
    skills : [String]
});

module.exports = mongoose.model('Course', courseSchema);
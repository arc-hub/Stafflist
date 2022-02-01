const mongoose = require('mongoose');

var staffSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required'
    },
    Email: {
        type: String,
        required: 'This field is required'
    },
    Mobile: {
        type: Number,
        required: 'This field is required'
    },
    Position: {
        type: String,
        required: 'This field is required'
    },
})

mongoose.model('Staff', staffSchema);
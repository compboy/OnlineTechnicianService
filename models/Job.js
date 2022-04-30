const mongoose = require('mongoose')


const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
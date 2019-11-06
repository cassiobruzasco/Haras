let mongoose = require('mongoose');

// Customer Schema
let customerSchema = mongoose.Schema({
    name:{
        type: String,
    }, 
    birth:{
        type: Date,
    },
    registerAge:{
        type: Number,
    },
    sponsor:{
        type: String,
    },
    sponsorId:{
        type: Number,
    },
    relationship:{
        type: String,
    },
    address:{
        type: String,
    },
    addressNumber:{
        type: Number,
    },
    addressExtra:{
        type: String,
    },
    addressBlock:{
        type: String,
    },
    zipCode:{
        type: Number,
    },
    mainContact:{
        type: Number,
    },
    extraContact:{
        type: Number,
    },
    paymentType:{
        type: String,
    },
    paymentAmount:{
        type: Number,
    },
    covenant:{
        type: String,
    },
    notes:{
        type: String,
    }
});

let customer = module.exports = mongoose.model('Customer', customerSchema);
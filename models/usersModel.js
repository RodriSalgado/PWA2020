const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

// Para usar bcrypt
const bcrypt = require('bcrypt');


const MainSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
})


// Para usar bcrypt: middleware de "pre save". Agarra el password del modelo de usuarios, lo encripta y lo guarda encriptado.
MainSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
})

module.exports = mongoose.model('users', MainSchema);
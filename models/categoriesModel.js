const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const MainSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

// Para usar Paginate
MainSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model('categories', MainSchema);
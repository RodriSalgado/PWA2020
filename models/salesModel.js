const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    product_id: {
        type: Schema.ObjectId,
        ref: "products"
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const MainSchema = new Schema({
    products: productSchema,
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "users"
    }
});

module.exports = mongoose.model('sales', MainSchema);
const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const MainSchema = new Schema({
    name: {
        type: String,
        index: true,
        trim: true
    },
    sku: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'Price is mandatory'],
        get: function (price) {
            return price * 1.21
        }
    },
    description: String,
    quantity: Number,
    category: {
        type: Schema.ObjectId,
        ref: "categories"
    },
    featured: Number

    /* 
    discountedPrice: {},
    image: {},
    tags: {},
    related: {}
    */

})


// Para usar Virtuals
/* MainSchema.virtual('nombre_sku').get(function(){
    return this.name+' '+this.sku
})
MainSchema.set('toJSON',{getters:true,virtuals:true}) */

MainSchema.virtual('price_currency').get(function(){
    return "$ " + this.price
})
MainSchema.set('toJSON',{getters:true,virtuals:true})

// Para usar Paginate
MainSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model('products', MainSchema);
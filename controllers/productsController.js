var productsModel = require("../models/productsModel");
var categoriesModel = require("../models/categoriesModel");

module.exports = {
    getAll: async function (req, res, next) {
        let products = await productsModel.paginate({}, {
            populate: 'category',
            limit: 2,
            sort: { name: 1 },
            page: (req.query.page ? req.query.page : 1)
        })
        res.status(200).json(products);
    },

    getFeatured: async function (req, res, next) {
        let products = await productsModel.find({ 'featured': 1 });
        res.status(200).json(products);
    },

    getById: async function (req, res, next) {
        let products = await productsModel.findById(req.params.id);
        res.status(200).json(products);
    },

    getByCategory: async function (req, res, next) {
        // De esta forma solo me trae el Category ID en el JSON y no me muestra la info de la categoría
        /* let products = await productsModel.find({'category': req.params.id}); */
        let products = await productsModel.paginate({ category: req.params.id }, {
            populate: 'category',
            limit: 10,
            sort: { name: 1 },
            page: (req.query.page ? req.query.page : 1)
        });
        res.status(200).json(products);
    },

    create: async function (req, res, next) {
        let product = new productsModel({
            name: req.body.name,
            sku: req.body.sku,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            featured: req.body.featured
        });
        let data = await product.save();
        res.status(201).json({
            "status": "Product created successfully",
            "data": data
        });
    },

    update: async function (req, res, next) {
        let data = await productsModel.update({ _id: req.params.id }, req.body, { multi: false });
        res.status(201).json({
            "status": "Product updated successfully",
            "data": data
        });
    },

    delete: async function (req, res, next) {
        let data = await productsModel.findByIdAndDelete(req.params.id);

        res.status(201).json({
            "status": "Product deleted successfully",
            "data": data
        });
    }
}
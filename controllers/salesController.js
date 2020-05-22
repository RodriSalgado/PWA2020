var salesModel = require("../models/salesModel");
var productsModel = require("../models/productsModel");
var categoriesModel = require("../models/categoriesModel");

module.exports = {
    getAll: async function (req, res, next) {
        let sales = await salesModel.find({});
        res.status(200).json(sales);
    },

    getById: async function (req, res, next) {
        let sales = await salesModel.findById(req.params.id);
        res.status(200).json(sales);
    },

    create: async function (req, res, next) {
        let product = await productsModel.findById(req.body.product_id);
        
        let sales = new salesModel({
            total: product.price,
            products: {
                product_id: req.body.product_id,
                name: product.name,
                price: product.price
            }
            //user: falta agregar el token del usuario que hace la compra
        });
        
        let data = await sales.save();
        res.status(201).json({
            "status": "Sale created successfully",
            "data": data
        });
    },

    delete: async function (req, res, next) {
        let data = await salesModel.findByIdAndDelete(req.params.id);

        res.status(201).json({
            "status": "Sale deleted successfully",
            "data": data
        });
    }

}


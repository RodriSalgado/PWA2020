var categoriesModel = require("../models/categoriesModel");

module.exports = {
    
    getAll: async function (req, res, next) {
        let categories = await categoriesModel.find({});
        res.status(200).json(categories);
    },

    getById: async function (req, res, next) {
        let category = await categoriesModel.findById(req.params.id);
        res.status(200).json(category);
    },

    create: async function (req, res, next) {
        let category = new categoriesModel({name: req.body.name});
        let data = await category.save();
        res.status(201).json({
            "status": "Category created successfully",
            "data": data
        });
    },

    update: async function (req, res, next) {
        let data = await categoriesModel.update({ _id: req.params.id }, req.body, { multi: false });
        res.status(201).json({
            "status": "Category updated successfully",
            "data": data
        });
    },

    delete: async function (req, res, next) {
        let data = await categoriesModel.findByIdAndDelete(req.params.id);

        res.status(201).json({
            "status": "Category deleted successfully",
            "data": data
        });
    }

}
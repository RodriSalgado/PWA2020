var mainModel = require("../models/adminModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    getAll: async function (req, res, next) {
        let admin = await mainModel.find({});
        res.status(200).json(admin);
    },

    getById: async function (req, res, next) {
        let admin = await mainModel.findById(req.params.id);
        res.status(200).json(admin);
    },

    create: async function (req, res, next) {
        let data = await mainModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password
        });
        res.status(201).json({
            "status": "Admin created successfully",
        });
    },

    login: async function (req, res, next) {
        // Consulto por el usuario
        let admin = await mainModel.findOne({ email: req.body.email });
        if (admin) {
            // Valido el password
            if (bcrypt.compareSync(req.body.password, admin.password)) {
                // Password válido: genero un token
                const token = jwt.sign(
                    { admin: admin },
                    req.app.get('secretKey'),
                    { expiresIn: '1h' }
                );
                res.status(201).json({ token: token });
            } else {
                // Password inválido
                res.json({
                    message: "Invalid password",
                    data: null
                });
            }
        } else {
            // Usuario inválido
            res.json({
                message: "Invalid email",
                data: null
            });
        }
    }

}
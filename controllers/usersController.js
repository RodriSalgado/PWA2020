var mainModel = require("../models/usersModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    getAll: async function (req, res, next) {
        let users = await mainModel.find({});
        res.status(200).json(users);
    },

    getById: async function (req, res, next) {
        let user = await mainModel.findById(req.params.id);
        res.status(200).json(user);
    },

    create: async function (req, res, next) {
        let data = await mainModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json({
            "status": "User created successfully",
            "data": data
        });
    },

    login: async function (req, res, next) {
        // Consulto por el usuario
        let user = await mainModel.findOne({ email: req.body.email });
        if (user) {
            // Valido el password
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // Password válido: genero un token
                const token = jwt.sign({ user: email }, req.app.get('secretKey'), { expiresIn: '1h' });
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
                message: "Invalid user",
                data: null
            });
        }
    }

}
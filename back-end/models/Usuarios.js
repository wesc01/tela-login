const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    senha: {
        type: String,
        required: true
    },

    foto: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    seguidores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }],

    seguindo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }]

}, {

    timestamps: true

});

module.exports = mongoose.model("Usuario", UsuarioSchema);
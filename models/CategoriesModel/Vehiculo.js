// models/categories/Vehiculo.js
const mongoose = require("mongoose");

const vehiculoSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    kilometraje: Number,
    combustible: String,
    post: { type: mongoose.Types.ObjectId, ref: "Post" }
}, { timestamps: true });

module.exports = mongoose.model("Vehiculo", vehiculoSchema);

// models/categories/Telefono.js
const mongoose = require("mongoose");

const telephoneSchema = new mongoose.Schema({
    etat: String,
    
    // 🔷 CAMPOS COMUNES PARA TELÉFONOS Y ACCESORIOS
    tipoArticulo: String,
    marque: String,
    modelo: String,
    referencia: String,
    capacite: String,
    colortelefono: String,
    copie: String,
    type_memoire: String,
    
    // 🔷 CAMPOS PARA SMARTPHONES
    os: String,
    appareil: String,
    camerafrontal: String,
    gigas: String,
    doublepuces: String,
    bateria: String,
    charging_type: String,
    
    // 🔷 OTROS CAMPOS ESPECÍFICOS
    compatibiliteAccessoire: String,
    capaciteCarte: String,
    puissanceChargeur: String,
    typeConnexionAudio: String,
    typeConnexionFixFax: String,
    connectiviteManette: String,
    dureeOffre: String,
    etatPiece: String,
    capacitePowerbank: String,
    tailleEcranWatch: String,
    fonctionnalitesWatch: String,
    compatibiliteProtection: String,
    compatibiliteStylet: String,
    caracteristiquesStylet: String,
    compatibilite: String,
    tailleEcranTablette: String,
    etatTablette: String,
    marcacelular: String,
    marcaVR: String,

    
}, { timestamps: true });

module.exports = mongoose.model("telephone", telephoneSchema);

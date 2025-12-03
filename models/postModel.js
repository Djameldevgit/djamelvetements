 
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // 🔷 CAMPOS DEL SISTEMA BASE (FIJOS)
    images:  [],
       
    likes: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'user' 
    }],
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'user',
        required: true 
    },
    
    // 🔷 INFORMACIÓN BÁSICA (FIJOS)
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    content: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    
    // 🔷 CATEGORÍA Y SUBCATEGORÍA (FIJOS)
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    
    // 🔷 PRECIO Y VENTA (FIJOS)
    price: {
        type: Number,
        required: true,
        min: 0
    },
    tipodemoneda: String,
    tipoventa: String,
    
    // 🔷 CONTACTO (FIJOS)
    telefono: {
        type: String,
        default: "0658556296",
        validate: {
            validator: function(phone) {
                if (!phone) return true;
                return /^[\d+][\d\s-()]+$/.test(phone);
            },
            message: 'Formato de teléfono inválido'
        }
    },
    
    // 🔷 ESTADO Y CARACTERÍSTICAS GENERALES (FIJOS)
    etat: String,
    estado: {
        type: String,
        enum: ["activo", "inactivo", "eliminado"],
        default: "activo"
    },
    
    // 🔷 REFERENCIA AL MODELO ESPECÍFICO
    vetement: { 
        type: mongoose.Types.ObjectId, 
        ref: 'vetement',
        required: function() {
            return this.category === 'vetements';
        }
    },
  telephone: { 
        type: mongoose.Types.ObjectId, 
        ref: 'telephone',
        required: function() {
            return this.category === 'telephones';
        }
    }



}, {
    timestamps: true
});

// 🔷 ÍNDICES PARA MEJOR PERFORMANCE
postSchema.index({ category: 1, subCategory: 1 });
postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ price: 1 });
postSchema.index({ etat: 1 });
postSchema.index({ estado: 1 });
postSchema.index({ createdAt: -1 });

// 🔷 MIDDLEWARE PARA POPULATE AUTOMÁTICO
postSchema.pre('find', function() {
    this.populate('vetement');
});

postSchema.pre('findOne', function() {
    this.populate('vetement');
});

module.exports = mongoose.model('post', postSchema);
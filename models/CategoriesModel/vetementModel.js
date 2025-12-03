const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  
 
// 🎯 ROPA HOMBRE
ropahombre: String,
 
// 🎯 ROPA MUJER  
ropamujer: String,

// 🎯 ZAPATOS HOMBRE
zapatoshombre: String,

// 🎯 ZAPATOS MUJER
zapatosmujer: String,

// 🎯 RELOJES
reloj: String,

// 🎯 GAFAS
gafas: String,

// 🎯 JOYERÍA
bijoux: String,

// 🎯 ROPA NIÑOS
garcons: String,

// 🎯 ROPA NIÑAS
filles: String,

// 🎯 ROPA BEBÉ
bebes: String,

// 🎯 ROPA PROFESIONAL
ropaprofesional: String,

// 🎯 BOLSOS Y MALETAS
sacvalise: String,


 
  
    tipoventa: String,
    
    // 🔷 CARACTERÍSTICAS GENERALES
    genero: String,
 
    color: [],
    temporada: String,
    marca: String,
    material: String,
    estilo: String,
    
    // 🔷 BEBÉS
    edadBebes: String,
    
    // 🔷 BIJOUX
    tipopiedra: String,
    tipomaterialbijoux: String,
    
    // 🔷 ZAPATOS MUJER
    alturatacon: String,
    tipodecierre: String,
    formadepunta: String,
    
    // 🔷 ZAPATOS HOMBRE
    tipodesuela: String,
    tipodecierre_hombre: String,
    
    // 🔷 COLOR Y TEMPORADA ADICIONAL
    color: [],
    ocasion: String,
    
    // 🔷 GAFAS
    tipodelente: String,
    anchopuente: String,
    langitudpatilla: String,
    
    // 🔷 RELOJES
    movimientoreloj: String,
    materialcorrea: String,
    resistenciaagua: String,
    funcionalidades: String,
    tiporeloj: String,
    
    // 🔷 SAC Y VALISE
    correa: String,
    tallasaco: String,
    tipodsangle: String,
    
    // 🔷 PROFESIONAL
    tipodelabata: String,
    sectordetrabajo: String,
    
    // 🔷 TALLA
    talla: []

}, {
    timestamps: true
})

// 🔷 ÍNDICES PARA MEJOR PERFORMANCE
 
 
postSchema.index({ marca: 1 })
postSchema.index({ genero: 1 })
 
postSchema.index({ material: 1 })
postSchema.index({ temporada: 1 })

module.exports = mongoose.model('vetement', postSchema)
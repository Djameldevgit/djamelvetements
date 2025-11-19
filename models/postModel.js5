const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    // 🔷 CAMPOS EXISTENTES DEL SISTEMA
    content: String,
    title: String,
    link: String,
    price: String,
    priceType: String,
    offerType: String,
    features: {
        type: Array,
        default: []
    },
    images: {
        type: Array,
        required: true
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },

    // 🔷 CAMPOS COMUNES A TODAS LAS CATEGORÍAS
    category: {
        type: String,
        default: "Agence de Voyage"
    },
    subCategory: String,
    description: String,
    wilaya: String,
    commune: String,
    contacto: String,

    // 🔷 CAMPOS DE VIAJE (COMPARTIDOS)
    datedepar: String,
    horadudepar: String,
    horariollegada: String,
    duracionviaje: String,
    fecharegreso: String,
    dateretour: String,           // 🔷 NUEVO
    dureeSejour: String,          // 🔷 NUEVO

    // 🔷 CAMPOS DE TRANSPORTE
    transporte: String,
    tipoTransporte: String,
    claseTransporte: String,
    companiaTransporte: String,
    numeroTransporte: String,
    itinerarioTransporte: String,
    tiempoTransporte: String,
    serviciosTransporte: {
        type: Array,
        default: []
    },
    comentariosTransporte: String,

    // 🔷 CAMPOS ESPECÍFICOS DE HAJJ & OMRA
    categoriaHotelMeca: String,    // 🔷 NUEVO
    compagnieAerienne: String,     // 🔷 NUEVO (también usado en voyage organisé)
    typeTransport: String,         // 🔷 NUEVO
    precioBase: String,            // 🔷 NUEVO
    tipoPrecio: String,            // 🔷 NUEVO
   
    // 🔷 CAMPOS ESPECÍFICOS DE LOCATION VACANCES
    tipoPropiedad: String,         // 🔷 NUEVO
    capacidad: String,             // 🔷 NUEVO
    habitaciones: String,          // 🔷 NUEVO
    superficie: String,
    nombrePropiedad: String,       // 🔷 NUEVO
    direccionCompleta: String,     // 🔷 NUEVO
    ciudad: String,                // 🔷 NUEVO
    zonaBarrio: String,            // 🔷 NUEVO
    descripcionUbicacion: String,  // 🔷 NUEVO
    transportInclus: String,       // 🔷 NUEVO
 
    // 🔷 CAMPOS ESPECÍFICOS DE VOYAGE ORGANISÉ
    categoriaAlojamiento: String,  // 🔷 NUEVO
    tipoHabitacion: String,        // 🔷 NUEVO
    regimenComidas: String,        // 🔷 NUEVO
    ubicacionHotel: String,        // 🔷 NUEVO
    nombreHotel: String,           // 🔷 NUEVO
    ciudadHotel: String,           // 🔷 NUEVO
    direccionHotel: String,        // 🔷 NUEVO
    zonaRegion: String,            // 🔷 NUEVO
    modeTransport: String,         // 🔷 NUEVO
    classeTransport: String,       // 🔷 NUEVO
    typeVol: String,               // 🔷 NUEVO
    baggage: String,               // 🔷 NUEVO
    repasVol: String,              // 🔷 NUEVO
    
    // 🔷 CAMPOS DE PERIODO VIAJE
    mesInicio: String,
    mesFin: String,
    temporada: String,
    anio: String,

    // 🔷 PRECIOS
    prixAdulte: String,
    prixEnfant: String,
    prixBebe: String,

    // 🔷 SERVICIOS GENERALES
    servicesInclus: {
        type: Array,
        default: []
    },
    activites: {
        type: Array,
        default: []
    },
    language: {
        type: Array,
        default: []
    },
    specifications: {
        type: Array,
        default: []
    },
    optionsPaiement: {
        type: Array,
        default: []
    },
    documentsRequises: {
        type: Array,
        default: []
    },
    excursions: {
        type: Array,
        default: []
    },
    servicios: {
        type: Array,
        default: []
    },
    serviciosTr: {
        type: Array,
        default: []
    },
     
    // 🔷 TIPO Y CATEGORÍA
    typeVoyage: String,
    niveauConfort: String,
    publicCible: String,

    // 🔷 CAMPOS ESPECÍFICOS PARA VOYAGE ORGANISÉ (EXISTENTES)
    destinacionlocacionvoyage: String,
    destinacionomra: String,
    destinacionvoyageorganise: String,
    paysDestination: String,
    voyage1hotel1: String,
    voyage1nombrehotel1: String,
    voyage2hotel2: String,
    voyage1nombrehotel2: String,

    // 🔷 CAMPOS PARA CLASIFICACION HOTEL
    nombredelhotel: String,
    adresshotel: String,
    estrellas: String,
    serviciosdelhotel: String,
    incluidoenelprecio: String,
    totalhabitaciones: String,
    tipodehabutaciones: {
        type: Array,
        default: []
    },
    wifi: {
        type: Array,
        default: []
    },
    hotelWebsite: String,

    // 🔷 CAMPOS ESPECÍFICOS PARA LOCATION VACANCES (EXISTENTES)
    Location_Vacances: String,
    alquilergeneral: String,
    etage: String,
    promoteurimmobilier: {
        type: Boolean,
        default: false
    },
    adress: String,
    capacitePersonnes: String,
    nombreChambres: String,
    nombreSallesBain: String,

    // 🔷 EQUIPAMIENTOS (MANTENER EL ORIGINAL COMO BOOLEAN)
    wifiGratuit: {
        type: Boolean,
        default: false
    },
    climatisation: {
        type: Boolean,
        default: false
    },
    cuisineEquipee: {
        type: Boolean,
        default: false
    },
    television: {
        type: Boolean,
        default: false
    },
    piscine: {
        type: Boolean,
        default: false
    },
 
    animauxAcceptes: {
        type: Boolean,
        default: false
    },
    menageInclus: {
        type: Boolean,
        default: false
    },

    // 🔷 CHECK-IN/OUT
    checkInTime: String,
    checkOutTime: String,

    // 🔷 TARIFAS
    tarifnuit: String,
    reservacionenlinea: String,
    views: { type: Number, default: 0 },

    // 🔷 PAGO
    acompteRequise: {
        type: Boolean,
        default: false
    },
    pourcentageAcompte: String,

    // 🔷 CAMPOS ESPECÍFICOS PARA HAJJ & OMRA (EXISTENTES)
    guideLocal: {
        type: Boolean,
        default: false
    },
    repasInclus: {
        type: Boolean,
        default: false
    },
    transfertAeroport: {
        type: Boolean,
        default: false
    },
    delaiTraitement: String,
    formalites: String,
    assurancesIncluses: {
        type: Boolean,
        default: false
    },
  
    // 🔷 POLÍTICAS Y CONTACTO (COMPARTIDOS)
    cancelarreserva: String,
    conditionsAnnulation: String,
    politiqueAnnulation: String,
    itemsReservations_Visa: String
   
}, {
    timestamps: true
})

// 🔷 ÍNDICES PARA MEJOR PERFORMANCE
postSchema.index({ category: 1, subCategory: 1 })
postSchema.index({ wilaya: 1, commune: 1 })
postSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model('post', postSchema)
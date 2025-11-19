const mongoose = require('mongoose');
const Posts = require('./postModel');

const userSchema = new mongoose.Schema({
  // --- PRIVACY SETTINGS ---
  fullname: { type: String, default: '' },
   
  // --- DATOS BÁSICOS ---
  username: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    maxlength: 25,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: props => `${props.value} no es un username válido. Solo se permiten letras, números y guiones bajos.`
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} no es un email válido.`
    }
  },
  password: { type: String, required: true, minlength: 6 },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
  role: {
    type: String,
    enum: ['Utilisateur-No-authentifié', 'user', 'Super-utilisateur', 'moderador', 'admin'],
    default: 'user'
  },
  // ✅ CORREGIDO: presentacion sin typo
  presentacion: { type: String, default: '', maxlength: 150 }, // También cambié 130 a 150 para coincidir con tu frontend
  mobile: { type: String, default: '' },
  address: { type: String, default: '' },
  story: { type: String, default: '', maxlength: 200 },
  website: { type: String, default: '' },

  // --- RELACIONES ---
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
  post: [{ type: mongoose.Types.ObjectId, ref: 'post' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
  report: [{ type: mongoose.Types.ObjectId, ref: 'report' }],

  // --- PREFERENCIAS ---
  language: {
    type: String,
    enum: [  'fr', 'ar',   'kab'],
    default: 'ar'
  },
  opcionesUser: {
    type: [String],
    enum: ['archivos', 'lenguaje', 'chat', 'interfaz'],
    default: []
  },

  // --- ESTADO DE LA CUENTA ---
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  loginType: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },

  // --- FECHAS ---
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
  lastActivity: { type: Date, default: null },
  lastConnectedAt: { type: Date, default: null },
  lastDisconnectedAt: { type: Date, default: null },
  lastOnline: { type: Date },
  isOnline: { type: Boolean, default: false },

  // --- ESTADÍSTICAS ---
  totalReportGiven: { type: Number, default: 0 },
  likesGiven: { type: Number, default: 0 },
  likesReceived: { type: Number, default: 0 },
  commentsMade: { type: Number, default: 0 },
  commentsReceived: { type: Number, default: 0 },
  esBloqueado: { type: Boolean, default: false },

  // --- CARRITO ---
  cart: {
    items: [{
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
      quantity: { type: Number, default: 1, min: 1 },
      price: { type: Number, required: true },
      title: String,
      images: Array
    }],
    totalPrice: {
      type: Number,
      default: 0,
      set: function (value) {
        return isNaN(value) ? 0 : parseFloat(value.toFixed(2));
      }
    }
  }
}, { timestamps: true });

// --- Middleware pre-remove ---
userSchema.pre('remove', async function (next) {
  try {
    const userId = this._id;
    await Posts.updateMany(
      { likes: userId },
      { $pull: { likes: userId } }
    ).exec();
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('user', userSchema);
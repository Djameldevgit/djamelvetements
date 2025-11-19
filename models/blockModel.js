const mongoose = require('mongoose')

// Elimina fechaBloqueo ya que tienes timestamps
const UserBlockSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  motivo: {
    type: String,
    default: "Sin especificar"
  },
  content: {
    type: String,
    default: "Sin especificar"
  },
  fechaLimite: {
    type: Date,
    default: null
  },
  esBloqueado: {
    type: Boolean,
    default: true
  },
  userquibloquea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, {
  timestamps: true // Esto creará createdAt (fecha de bloqueo) y updatedAt automáticamente
});

 
module.exports = mongoose.model('BlockUser', UserBlockSchema);
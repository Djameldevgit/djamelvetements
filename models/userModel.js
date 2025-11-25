const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Utilisateur-No-authentifié', 'user', 'Super-utilisateur', 'moderador', 'admin'],
        default: 'user'
      },



    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },

    language: {
        type: String,
        enum: ['fr', 'ar', 'kab'],
        default: 'ar'
      },

      isVerified: { type: Boolean, default: false },
      isActive: { type: Boolean, default: true },
      loginType: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
      lastDisconnectedAt: { type: Date, default: null },
      lastOnline: { type: Date },
      isOnline: { type: Boolean, default: false },
      // --- FECHAS ---
      createdAt: { type: Date, default: Date.now },



    role: {type: String, default: 'user'},
  
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    story: {
        type: String, 
        default: '',
        maxlength: 200
    },
    website: {type: String, default: ''},
    followers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    saved: [{type: mongoose.Types.ObjectId, ref: 'user'}]
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.Types.ObjectId, // si es respuesta a otro comentario
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }], // likes al comentario
    user: { type: mongoose.Types.ObjectId, ref: 'user' }, // autor del comentario
    postId: { type: mongoose.Types.ObjectId, ref: 'post' }, // opcional
    postUserId: { type: mongoose.Types.ObjectId, ref: 'user' }, // dueño del post
    targetUserId: { type: mongoose.Types.ObjectId, ref: 'user' } // <-- nuevo: usuario comentado
}, {
    timestamps: true
});

module.exports = mongoose.model('comment', commentSchema);


const mongoose = require('mongoose');

const BlockUser = require('../models/blockModel');
const Users = require('../models/userModel');
const Posts = require('../models/postModel');
const Comments = require('../models/commentModel');

const Notifications = require('../models/notifyModel')

const sendMail = require('./sendMail');

const Report = require('../models/reportModel'); // o el nombre correcto





class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const userCtrl = {







  contactForActivation: async (req, res) => {
    try {
      const { message, lang } = req.body;
      const user = req.user; // gracias al middleware auth

      if (!message || !message.trim()) {
        return res.status(400).json({ msg: 'El mensaje es obligatorio.' });
      }

      // Asunto personalizado y mensaje para admin
      const subject = `Solicitud de activación de cuenta - ${user.username}`;
      const customMessage = `
        El usuario ${user.username} ha solicitado la activación de su cuenta.

        ID: ${user._id}
        Correo: ${user.email}

        Mensaje del usuario:
        ${message}
      `;

      const adminEmail = "artealger2020argelia@gmail.com";

      // Enviamos el correo con plantilla genérica "informativo"
      await sendMail(adminEmail, '#', lang || 'es', 'informativo', subject, customMessage);

      return res.json({ msg: '✅ Mensaje enviado correctamente al administrador.' });

    } catch (err) {
      console.error('❌ Error al procesar solicitud de activación:', err);
      return res.status(500).json({ msg: 'Error interno del servidor.' });
    }
  },

  // ...otros controladores


  contactMailSupport: async (req, res) => {
    try {
      const { title, message, lang } = req.body;

      // Asegúrate de que el usuario esté autenticado
      const user = req.user;
      if (!user) {
        return res.status(401).json({ msg: 'Usuario no autenticado.' });
      }

      if (!title || !message) {
        return res.status(400).json({ msg: 'Faltan el título o el mensaje.' });
      }

      const subject = `[Contacto] ${title} - ${user.username}`;
      const fullMessage = `
  Mensaje del usuario:
  --------------------
  Nombre: ${user.username}
  Email: ${user.email}
  ID: ${user._id}
  
  Mensaje:
  --------
  ${message}
      `;

      // Enviar el email al administrador
      await sendMail('artealger2020argelia@gmail.com', '#', lang || 'es', 'informativo', subject, fullMessage);

      return res.json({ success: true, msg: 'Mensaje enviado correctamente.' });
    } catch (err) {
      console.error('❌ Error al enviar el mensaje de contacto:', err);
      return res.status(500).json({ msg: 'Error interno al enviar el mensaje.' });
    }
  },

  contactBlockedSupport: async (req, res) => {
    try {
      const { message, lang } = req.body;
      const user = req.user;

      if (!message) {
        return res.status(400).json({ msg: 'El mensaje es obligatorio.' });
      }

      const subject = `🛑 Solicitud de revisión de bloqueo - ${user.username}`;
      const fullMessage = `
  Usuario: ${user.username}
  ID: ${user._id}
  Email: ${user.email}
  Mensaje: ${message}
  Fecha de solicitud: ${new Date().toLocaleString(lang || 'es')}
      `;

      await sendMail('artealger2020argelia@gmail.com', '#', lang || 'es', 'informativo', subject, fullMessage);

      return res.json({ msg: '✅ Solicitud de desbloqueo enviada correctamente.' });
    } catch (err) {
      console.error('❌ Error en contactBlockedSupport:', err);
      return res.status(500).json({ msg: 'Error al enviar la solicitud.' });
    }
  },




  validateUserActivity: async (req, res, next) => {
    const user = await Users.findById(req.user._id);
    if (!user) return res.status(401).json({ msg: 'Usuario no encontrado.' });

    // Si no está verificado y tiene más de 3 días
    const accountAge = Date.now() - new Date(user.createdAt).getTime();
    const threeDays = 3 * 24 * 60 * 60 * 1000;

    if (!user.isVerified && accountAge > threeDays) {
      await Users.findByIdAndDelete(user._id);
      return res.status(403).json({
        msg: 'Tu cuenta ha sido eliminada por no verificarla a tiempo. Regístrate de nuevo si deseas acceder.',
      });
    }

    next(); // pasa a la siguiente acción si todo está bien
  },



  toggleActiveStatus: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado." });

      user.isActive = !user.isActive;
      await user.save();

      res.json({ msg: "Estado actualizado", user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  // En tu controlador de búsqueda (backend)
  getAdmins: async (req, res) => {
    try {
      const admins = await Users.find({ role: 'admin' })
        .select('username avatar online _id');
      res.json({ users: admins });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },



  searchUser: async (req, res) => {
    try {
      const users = await Users.find({ username: { $regex: req.query.username } })
        .limit(10).select("username avatar")

      res.json({ users })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select('-password')
        .populate("followers following", "-password")
      if (!user) return res.status(400).json({ msg: "User does not exist." })

      res.json({ user })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },



  updateUser: async (req, res) => {
    try {
      // ✅ INCLUIR todos los campos que necesitas
      const {
     
        presentacion,
        username,
        mobile,
        address,
        story,
        website,
        email,
        avatar
      } = req.body

    
      // ✅ Actualizar TODOS los campos
      await Users.findOneAndUpdate({ _id: req.user._id }, {
       
        presentacion,
        username,
        mobile,
        address,
        story,
        website,
        ...(email && { email }), // Solo actualizar email si se proporciona
        ...(avatar && { avatar }) // Solo actualizar avatar si se proporciona
      })

      res.json({ msg: "Update Success!" })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  follow: async (req, res) => {
    try {
      const user = await Users.find({ _id: req.params.id, followers: req.user._id })
      if (user.length > 0) return res.status(500).json({ msg: "You followed this user." })

      const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
        $push: { followers: req.user._id }
      }, { new: true }).populate("followers following", "-password")

      await Users.findOneAndUpdate({ _id: req.user._id }, {
        $push: { following: req.params.id }
      }, { new: true })

      res.json({ newUser })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unfollow: async (req, res) => {
    try {

      const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
        $pull: { followers: req.user._id }
      }, { new: true }).populate("followers following", "-password")

      await Users.findOneAndUpdate({ _id: req.user._id }, {
        $pull: { following: req.params.id }
      }, { new: true })

      res.json({ newUser })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id]

      const num = req.query.num || 10

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
        { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
      ]).project("-password")

      return res.json({
        users,
        result: users.length
      })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  /*
  
    deleteUser: async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      try {
        // 1. Verificar permisos de administrador
        if (req.user.role !== 'admin') {
          await session.abortTransaction();
          return res.status(403).json({
            success: false,
            msg: 'Acceso denegado. Se requieren privilegios de administrador'
          });
        }
  
        // 2. Validar ID del usuario
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            msg: 'ID de usuario no válido'
          });
        }
  
        // 3. Obtener usuario a eliminar
        const userToDelete = await Users.findById(req.params.id).session(session);
        if (!userToDelete) {
          await session.abortTransaction();
          return res.status(404).json({
            success: false,
            msg: 'Usuario no encontrado'
          });
        }
  
        // 4. Prevenir auto-eliminación
        if (userToDelete._id.toString() === req.user._id.toString()) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            msg: 'No puedes eliminarte a ti mismo'
          });
        }
  
        // 5. Obtener todos los posts del usuario
        const userPosts = await Posts.find({ user: req.params.id }).session(session);
  
        // 6. Eliminación en cascada
        await Promise.all([
          // Eliminar posts y sus relaciones
          Posts.deleteMany({ user: req.params.id }).session(session)
            .then(async () => {
              // Eliminar comentarios de esos posts
              await Comments.deleteMany({
                post: { $in: userPosts.map(p => p._id) }
              }).session(session);
            }),
          // Eliminar denuncias en las que el usuario esté involucrado
          Report.deleteMany({
            $or: [
              { userId: req.params.id },
              { reportedBy: req.params.id }
            ]
          }).session(session),
  
          // Eliminar comentarios hechos por el usuario
          Comments.deleteMany({ user: req.params.id }).session(session),
  
          // Eliminar notificaciones
          Notifications.deleteMany({
            $or: [
              { sender: req.params.id },
              { recipient: req.params.id }
            ]
          }).session(session),
  
          // Actualizar relaciones de usuarios (followers, following, saved)
          Users.updateMany(
            {
              $or: [
                { followers: req.params.id },
                { following: req.params.id },
                { saved: req.params.id }
              ]
            },
            {
              $pull: {
                followers: req.params.id,
                following: req.params.id,
                saved: req.params.id
              }
            }
          ).session(session),
  
          // Limpiar likes del usuario en posts (array de referencias)
          Posts.updateMany(
            { likes: req.params.id },
            { $pull: { likes: req.params.id } }
          ).session(session),
  
          // Limpiar referencias en carritos de otros usuarios
          Users.updateMany(
            { "cart.items.postId": { $in: userPosts.map(p => p._id) } },
            { $pull: { "cart.items": { postId: { $in: userPosts.map(p => p._id) } } } }
          ).session(session).then(async () => {
            // Recalcular totales de carritos afectados
            const affectedUsers = await Users.find({
              "cart.items.postId": { $in: userPosts.map(p => p._id) }
            }).session(session);
  
            for (const user of affectedUsers) {
              const total = user.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
              await Users.updateOne(
                { _id: user._id },
                { $set: { "cart.totalPrice": total } }
              ).session(session);
            }
          })
        ]);
  
        // 7. Eliminar al usuario (esto activará el middleware pre('remove'))
        await userToDelete.remove({ session });
  
        // 8. Confirmar transacción
        await session.commitTransaction();
  
        res.json({
          success: true,
          msg: 'Usuario y todo su contenido relacionado eliminados permanentemente',
          deletedAt: new Date()
        });
  
      } catch (err) {
        await session.abortTransaction();
        console.error('Error en eliminación completa:', err);
        res.status(500).json({
          success: false,
          msg: 'Error al eliminar usuario',
          error: err.message
        });
      } finally {
        session.endSession();
      }
    },
  
  */
  deleteUser: async (req, res) => {
    try {
      // 1. Verificar permisos de administrador
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          msg: 'Acceso denegado. Se requieren privilegios de administrador'
        });
      }

      // 2. Validar ID del usuario
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          msg: 'ID de usuario no válido'
        });
      }

      // 3. Obtener usuario a eliminar
      const userToDelete = await Users.findById(req.params.id);
      if (!userToDelete) {
        return res.status(404).json({
          success: false,
          msg: 'Usuario no encontrado'
        });
      }

      // 4. Prevenir auto-eliminación
      if (userToDelete._id.toString() === req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          msg: 'No puedes eliminarte a ti mismo'
        });
      }

      // 5. Obtener todos los posts del usuario
      const userPosts = await Posts.find({ user: req.params.id });

      // 6. Eliminación en cascada (secuencial, sin Promise.all para evitar conflictos)

      // Eliminar posts
      await Posts.deleteMany({ user: req.params.id });

      // Eliminar comentarios de esos posts
      await Comments.deleteMany({
        post: { $in: userPosts.map(p => p._id) }
      });

      // Eliminar denuncias en las que el usuario esté involucrado
      await Report.deleteMany({
        $or: [
          { userId: req.params.id },
          { reportedBy: req.params.id }
        ]
      });

      // Eliminar comentarios hechos por el usuario
      await Comments.deleteMany({ user: req.params.id });

      // Eliminar notificaciones
      await Notifications.deleteMany({
        $or: [
          { sender: req.params.id },
          { recipient: req.params.id }
        ]
      });

      // Actualizar relaciones de usuarios (followers, following, saved)
      await Users.updateMany(
        {
          $or: [
            { followers: req.params.id },
            { following: req.params.id },
            { saved: req.params.id }
          ]
        },
        {
          $pull: {
            followers: req.params.id,
            following: req.params.id,
            saved: req.params.id
          }
        }
      );

      // Limpiar likes del usuario en posts
      await Posts.updateMany(
        { likes: req.params.id },
        { $pull: { likes: req.params.id } }
      );

      // Limpiar referencias en carritos de otros usuarios
      await Users.updateMany(
        { "cart.items.postId": { $in: userPosts.map(p => p._id) } },
        { $pull: { "cart.items": { postId: { $in: userPosts.map(p => p._id) } } } }
      );

      // Recalcular totales de carritos afectados
      const affectedUsers = await Users.find({
        "cart.items.postId": { $in: userPosts.map(p => p._id) }
      });

      for (const user of affectedUsers) {
        const total = user.cart.items.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );
        await Users.updateOne(
          { _id: user._id },
          { $set: { "cart.totalPrice": total } }
        );
      }

      // 7. Eliminar al usuario (esto activará cualquier middleware pre('remove'))
      await userToDelete.deleteOne();

      // 8. Respuesta final
      res.json({
        success: true,
        msg: 'Usuario y todo su contenido relacionado eliminados permanentemente',
        deletedAt: new Date()
      });

    } catch (err) {
      console.error('Error en eliminación completa:', err);
      res.status(500).json({
        success: false,
        msg: 'Error al eliminar usuario',
        error: err.message
      });
    }
  },
  getUsersAction: async (req, res) => {
    try {
      var filter = req.query.filter;

      console.log('🔍 Iniciando getUsersAction...');

      // 🎯 CORREGIDO: Agregar populate para followers y following
      var query = Users.find()
        .select('-password')
        .populate('followers', 'username   avatar')
        .populate('following', 'username   avatar')
        .lean();

      var features = new APIfeatures(query, req.query).paginating();
      var users = await features.query.sort('-createdAt');

     
      // 🎯 VERIFICACIÓN DE SEGURIDAD ANTES DEL MAP
      if (!users || !Array.isArray(users)) {
          users = [];
      }

      var usersWithDetails = await Promise.all(
        users.map(async function(user) {
          try {
            console.log('🔍 Procesando usuario: ' + user.username, {
              followers: user.followers,
              following: user.following
            });

            var posts = await Posts.find({ user: user._id });
            
            // 🎯 CÁLCULOS SEGUROS
            var totalLikesReceived = posts.reduce(
              function(acc, post) {
                return acc + (post.likes ? post.likes.length : 0);
              },
              0
            );
            
            var totalCommentsReceived = posts.reduce(
              function(acc, post) {
                return acc + (post.comments ? post.comments.length : 0);
              },
              0
            );
            
            var reportsReceived = await Report.countDocuments({
              userId: user._id,
            });
            
            var likesGiven = await Posts.countDocuments({ likes: user._id });
            var commentsMade = await Comments.countDocuments({
              user: user._id,
            });

            // 🎯 CORREGIDO: Typo en blockInfo
            var blockInfo = await BlockUser.findOne({ user: user._id })
              .populate('userquibloquea', 'username')
              .select('motivo content fechaLimite esBloqueado createdAt');

            // 🎯 CORREGIDO: Typo en blockInfoData
            var blockInfoData = null;
            if (blockInfo) {
              blockInfoData = {
                motivo: blockInfo.motivo,
                content: blockInfo.content,
                fechaLimite: blockInfo.fechaLimite,
                esBloqueado: blockInfo.esBloqueado,
                createdAt: blockInfo.createdAt,
                bloqueadoPor: blockInfo.userquibloquea ? blockInfo.userquibloquea.username : 'Desconocido'
              };
            }

            // 🎯 ESTRUCTURA SEGURA DEL USUARIO
            var userObject = Object.assign({}, user);
            
            // 🎯 AGREGAR CAMPOS FALTANTES PARA EL FRONTEND
            userObject.bio = user.bio || '';
            userObject.story = user.story || '';
            userObject.website = user.website || '';
            userObject.mobile = user.mobile || '';
            userObject.address = user.address || '';
            
            // 🎯 CÁLCULOS SEGUROS
            userObject.postCount = posts.length;
            userObject.totalLikesReceived = totalLikesReceived;
            userObject.totalCommentsReceived = totalCommentsReceived;
            userObject.totalFollowers = user.followers ? user.followers.length : 0;
            userObject.totalFollowing = user.following ? user.following.length : 0;
            userObject.totalReportsReceived = reportsReceived;
            userObject.likesGiven = likesGiven;
            userObject.commentsMade = commentsMade;
            userObject.blockInfo = blockInfoData;
            
            // 🎯 ASEGURAR ARRAYS PARA EL FRONTEND
            userObject.posts = posts || [];
            userObject.followers = user.followers || [];
            userObject.following = user.following || [];

            return userObject;
            
          } catch (userError) {
            console.error('❌ Error procesando usuario ' + user.username + ':', userError);
            
            // 🎯 DEVOLVER USUARIO BÁSICO EN CASO DE ERROR
            var safeUser = Object.assign({}, user);
            safeUser.postCount = 0;
            safeUser.totalLikesReceived = 0;
            safeUser.totalCommentsReceived = 0;
            safeUser.totalFollowers = 0;
            safeUser.totalFollowing = 0;
            safeUser.totalReportsReceived = 0;
            safeUser.likesGiven = 0;
            safeUser.commentsMade = 0;
            safeUser.blockInfo = null;
            safeUser.posts = [];
            safeUser.followers = [];
            safeUser.following = [];
            safeUser.bio = user.bio || '';
            safeUser.story = user.story || '';
            safeUser.website = user.website || '';
            safeUser.mobile = user.mobile || '';
            safeUser.address = user.address || '';
            
            return safeUser;
          }
        })
      );

      // 📊 Aplicar filtros
      switch (filter) {
        case 'mostLikes':
          usersWithDetails.sort(function(a, b) {
            return b.totalLikesReceived - a.totalLikesReceived;
          });
          break;
        case 'mostComments':
          usersWithDetails.sort(function(a, b) {
            return b.totalCommentsReceived - a.totalCommentsReceived;
          });
          break;
        case 'mostFollowers':
          usersWithDetails.sort(function(a, b) {
            return b.totalFollowers - a.totalFollowers;
          });
          break;
        case 'mostPosts':
          usersWithDetails.sort(function(a, b) {
            return b.postCount - a.postCount;
          });
          break;
        case 'mostReports':
          usersWithDetails.sort(function(a, b) {
            return b.totalReportsReceived - a.totalReportsReceived;
          });
          break;
        case 'lastLogin':
          usersWithDetails.sort(function(a, b) {
            var dateA = new Date(a.lastLogin || 0);
            var dateB = new Date(b.lastLogin || 0);
            return dateB - dateA;
          });
          break;
        case 'latestRegistered':
          usersWithDetails.sort(function(a, b) {
            var dateA = new Date(a.createdAt);
            var dateB = new Date(b.createdAt);
            return dateB - dateA;
          });
          break;
        default:
          break;
      }

      console.log('✅ getUsersAction completado: ' + usersWithDetails.length + ' usuarios');

      res.json({
        msg: 'Success!',
        result: usersWithDetails.length,
        users: usersWithDetails,
      });
    } catch (err) {
      console.error('❌ ERROR en getUsersAction:', err);
      return res.status(500).json({ 
        msg: err.message,
        users: [] // 🎯 Siempre devolver array vacío en error
      });
    }
  },
  getInactiveUsers: async (req, res) => {
    try {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const inactiveCandidates = await Users.find({
        isVerified: true,
        createdAt: { $lt: oneMonthAgo }
      }).select('_id username email createdAt');

      const trulyInactive = [];

      for (const user of inactiveCandidates) {
        const hasPosts = await Posts.exists({ user: user._id });
        const hasComments = await Comments.exists({ user: user._id });

        if (!hasPosts && !hasComments) {
          trulyInactive.push(user);
        }
      }

      res.json({ inactiveUsers: trulyInactive });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },












  eliminaRrestosDePosts: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {


      if (!req.user || req.user.role !== 'admin') {
        await session.abortTransaction();
        return res.status(403).json({
          success: false,
          msg: 'Acceso denegado. Se requieren privilegios de administrador'
        });
      }

      const orphanedPosts = await Posts.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'author_data'
          }
        },
        {
          $match: {
            $or: [
              { user: { $exists: false } },
              { user: null },
              { author_data: { $size: 0 } }
            ]
          }
        },
        {
          $project: {
            _id: 1,
            comments: 1
          }
        }
      ]).session(session);


      const idsToDelete = orphanedPosts.map(post => post._id);
      const commentIdsToDelete = orphanedPosts.flatMap(post => post.comments || []);
      const idsToDeleteObjectId = idsToDelete.map(id => new mongoose.Types.ObjectId(id));

      await Promise.all([
        Posts.deleteMany({ _id: { $in: idsToDeleteObjectId } }).session(session),
        Comments.deleteMany({ _id: { $in: commentIdsToDelete } }).session(session),
        Posts.updateMany({}, { $pull: { likes: { $in: idsToDeleteObjectId } } }).session(session),
        Users.updateMany({}, { $pull: { saved: { $in: idsToDeleteObjectId } } }).session(session),
        Users.updateMany(
          {},
          { $pull: { "cart.items": { postId: { $in: idsToDeleteObjectId } } } }
        ).session(session)
      ]);

      await session.commitTransaction();

      res.json({
        success: true,
        deletedPosts: idsToDelete.length,
        deletedComments: commentIdsToDelete.length,
        message: `Limpieza completada: ${idsToDelete.length} posts y ${commentIdsToDelete.length} comentarios eliminados`
      });

    } catch (err) {

      console.error('Error en limpieza de posts huérfanos:');
      console.error(err);
      console.error('Stack Trace:');


      await session.abortTransaction();
      console.error('Error en limpieza de posts huérfanos:', err);
      res.status(500).json({
        success: false,
        error: err.message,
        details: process.env.NODE_ENV === 'development' ? {
          stack: err.stack,
          fullError: JSON.stringify(err, Object.getOwnPropertyNames(err))
        } : undefined
      });
    } finally {
      session.endSession();
    }
  },




}


module.exports = userCtrl
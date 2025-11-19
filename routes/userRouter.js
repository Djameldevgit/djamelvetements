const router = require('express').Router()
const auth = require("../middleware/auth")
 
const userCtrl = require('../controllers/userCtrl')

// Rutas de carrito
router.get('/users/admins', auth, userCtrl.getAdmins);
router.post('/contact-support-block', auth, userCtrl.contactBlockedSupport);
router.get('/users/search', auth, userCtrl.searchUser)
router.post('/contact-support', auth, userCtrl.contactMailSupport)
 
 
// Rutas de usuarios
router.get('/users', auth, userCtrl.getUsersAction)

// ✅ PRIMERO: Rutas específicas de privacidad
 
// ✅ DESPUÉS: Rutas dinámicas con parámetros
router.get('/user/:id', auth, userCtrl.getUser);
router.patch('/user', auth, userCtrl.updateUser);
router.get('/suggestionsUser', auth, userCtrl.suggestionsUser);
router.patch('/user/:id/follow', auth, userCtrl.follow);
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow);
router.delete('/user/:id', auth, userCtrl.deleteUser);

// Otras rutas
router.delete('/posts', auth, userCtrl.eliminaRrestosDePosts)
router.post('/contact-activation-request', auth, userCtrl.contactForActivation);
router.patch('/toggle_active/:id', auth, userCtrl.toggleActiveStatus);
router.get('/inactive-users', auth, userCtrl.getInactiveUsers);

module.exports = router;





module.exports = router
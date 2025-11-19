const router = require('express').Router()
const auth = require("../middleware/auth")
const userActionCtrl = require('../controllers/userActionCtrl');
 

router.get('/users/counttotal', auth, userActionCtrl.getUsersCount); // Para el total de usuarios
router.get('/users/active-last-24h', auth, userActionCtrl.getActiveUsersLast24h); // Para usuarios activos en las últimas 24 horas
router.get('/users/active-last-3h', auth, userActionCtrl.getActiveUsersLast3h); // Para usuarios activos en las últimas 3 horas
 
 
router.get('/search', auth, userActionCtrl.searchUser)
router.get('/delete/:id', auth, userActionCtrl.getUser)
router.get('/user/:id', auth, userActionCtrl.getUser)
 
 
 
 
  
module.exports = router
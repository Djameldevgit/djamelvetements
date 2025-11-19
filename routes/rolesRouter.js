const router = require('express').Router()
 
const roleCtrl = require('../controllers/roleCtrl')
const auth = require("../middleware/auth")
router.patch('/ ', auth, roleCtrl.updateRole);
router.patch('/user/:id/roleusernoidantificado', auth, roleCtrl.UserRoleNoIdentificado);
router.patch('/user/:id/roleuser', auth, roleCtrl.assignUserRole);
router.patch('/user/:id/rolesuperuser', auth, roleCtrl.assignSuperUserRole);
router.patch('/user/:id/rolemoderador', auth, roleCtrl.assignModeratorRole);
router.patch('/user/:id/roleadmin', auth, roleCtrl.assignAdminRole);
router.patch('/update_role/:id', auth, roleCtrl.updateRole);
router.get('/users/search',  auth, roleCtrl.searchUser)
module.exports = router
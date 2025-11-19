const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')
const auth = require('../middleware/auth')
 
router.post('/send-user-emails', auth, authCtrl.sendEmailsParaUsers);
router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

router.post('/logout', authCtrl.logout)

router.post('/refresh_token', authCtrl.generateAccessToken)
router.post('/send_activation_email', auth, authCtrl.sendActivationEmail);
router.post('/activate', authCtrl.activationAccount);
router.patch("/users/:id/toggle-verify", auth,   authCtrl.toggleVerification);

router.post('/forgot', authCtrl.forgotPassword)

router.post('/reset', auth, authCtrl.resetPassword)

router.post('/google_login', authCtrl.googleLogin)

router.post('/facebook_login', authCtrl.facebookLogin)

module.exports = router
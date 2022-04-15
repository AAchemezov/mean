const express = require('express')
const router = express.Router()
const passport = require("passport")
const controller = require('../controllers/analytics')


router.get('/analytics', passport.authenticate('jwt', {session: false}), controller.analytics)
router.get('/overview', passport.authenticate('jwt', {session: false}), controller.overview)

module.exports = router
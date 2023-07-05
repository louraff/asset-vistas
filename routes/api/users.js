const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Routes
// all requests hitting this file will already be prefixed with a /api/users endpoint

// CREATE
// Endpoint: /api/users
// Endpoint in routes file: /
router.post('/', usersCtrl.create)

// POST /api/users/login
router.post('/login', usersCtrl.login);

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// Export router
module.exports = router
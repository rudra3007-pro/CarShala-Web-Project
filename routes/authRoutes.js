const express  = require('express')
const router   = express.Router()
const passport = require('passport')
const User     = require('../models/user')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    try {
        await User.create(req.body)
        res.redirect('/login')
    } catch (err) {
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/car',
        failureRedirect: '/login'
    })
)

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login')
    })
})


router.get('/', (req, res) => res.redirect('/login'))

module.exports = router
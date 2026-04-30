const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/carDB')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })
    if (!user) return done(null, false)
    if (user.password !== password) return done(null, false)
    return done(null, user)
}))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/carRoutes'))

app.listen(3000)
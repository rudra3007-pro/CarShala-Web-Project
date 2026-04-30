const express = require('express')
const router  = express.Router()
const Car     = require('../models/car')

function isAuth(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}


router.get('/car', isAuth, async (req, res) => {
    const cars = await Car.find().sort({ createdAt: -1 })
    res.render('dashboard', { cars })
})


router.get('/car/:id', isAuth, async (req, res) => {
    const car = await Car.findById(req.params.id)
    res.render('show', { car })
})


router.post('/car', isAuth, async (req, res) => {
    await Car.create(req.body)
    res.redirect('/car')
})


router.get('/car/:id/edit', isAuth, async (req, res) => {
    const car = await Car.findById(req.params.id)
    res.render('edit', { car })
})


router.post('/car/:id/edit', isAuth, async (req, res) => {
    const { price, seater } = req.body
    await Car.findByIdAndUpdate(req.params.id, { price, seater })
    res.redirect('/car')
})


router.get('/car/:id/delete', isAuth, async (req, res) => {
    await Car.findByIdAndDelete(req.params.id)
    res.redirect('/car')
})


router.get('/dashboard', (req, res) => res.redirect('/car'))

module.exports = router
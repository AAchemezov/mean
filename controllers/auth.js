const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../modals/User')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})
    if (!candidate) {
        res.status(404).json({
            message: 'Пользователь не найден'
        })
        return
    }
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (!passwordResult) {
        res.status(401).json({
            message: 'Пароли не совпадают'
        })
        return
    }
    const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
    }, keys.jwt, {expiresIn: 60 * 60})
    res.status(200).json({token: `Bearer ${token}`})
}

module.exports.register = async (req, res) => {
    try {
        const candidate = await User.findOne({email: req.body.email})
        if (candidate) {
            res.status(409).json({
                message: 'Такой email уже занят'
            })
            return
        }
        const salt = bcrypt.genSaltSync(10)
        const pass = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(pass, salt),
        })
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        //error
    }
}
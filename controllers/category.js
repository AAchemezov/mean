const Category = require('../modals/Category')
const Position = require('../modals/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.user.id
        })
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.status(200).json({message: 'Категория удалена'})
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = (req, res) => async (req, res) => {
    try {
        const {name, file} = req.body
        const user = req.user.id
        const imageSrc = file?.path ?? ''
        const category = await new Category({name, user, imageSrc}).save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = (req, res) => {
}

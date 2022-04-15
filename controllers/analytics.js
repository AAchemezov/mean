const Order = require('../modals/Order')
const errorHandler = require('../utils/errorHandler')
const moment = require("moment");

const MOMENT_DAY_FORMAT = 'DD.MM.YYYY'

module.exports.overview = async (req, res) => {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort(1)
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format(MOMENT_DAY_FORMAT)] || []
        const yesterdayOrdersNumber = yesterdayOrders.length
        // Количество заказов
        const totalOrdersNumber = allOrders.length
        // Количество дней
        const daysNumber = Object.keys(ordersMap).length
        // Количество заказов в день
        const orderPerDay = (totalOrdersNumber / daysNumber).toFixed()
        // Процент для кол-ва заказов
        // ((заказов вчера / кол-во заказов в день) - 1) * 100
        const ordersPercent = (((yesterdayOrdersNumber / orderPerDay) - 1) * 100).toFixed(2)
        // Общая выручка
        const totalGain = calculatePrice(allOrders)
        // Выручка в день
        const gainPerDay = totalGain / daysNumber
        // Выручка за вчера
        const yesterdayGain = calculatePrice(yesterdayOrders)
        // Процент выручки
        const gainPercent = (((yesterdayGain / orderPerDay) - 1) * 100).toFixed(2)
        // Сравнение выручки
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        // Сравнение кол-ва заказов
        const compareNumber = (yesterdayOrdersNumber - orderPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: ordersPercent > 0
            }
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.analytics = (req, res) => {
}

function getOrdersMap(orders = []) {
    const daysOrders = {}
    const currentDay = moment().format(MOMENT_DAY_FORMAT)

    orders.forEach((order) => {
        const day = moment(order.date).format(MOMENT_DAY_FORMAT)
        if (day === currentDay) {
            return
        }
        daysOrders[day] = [...(daysOrders[day] || []), order]
    })
    return daysOrders
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderCost = order.list.reduce((total, item) => total + item.cost * item.quantity, 0)
        return total + orderCost
    }, 0)
}
module.exports.login = (res, req) => {
    req
        .status(200)
        .json({
            login: 'from controller',
        })
}

module.exports.register = (res, req) => {
    req
        .status(200)
        .json({
            register: 'from controller',
        })
}
const csurf = require('csurf')

const middlewaresAuthCtrl = {};

middlewaresAuthCtrl.CSRFMiddleware = csurf({
    cookie: true
})

module.exports = middlewaresAuthCtrl;
const homeRouter = require('./home')
const userRouter = require('./user')
const profileRouter = require('./profile')
const productRouter = require('./product')
const adminRouter = require('./admin')
const cartRouter = require('./cart')

function route(app) {
    app.use('/', homeRouter)
    app.use('/user', userRouter)
    app.use('/profile', profileRouter)
    app.use('/product', productRouter)
    app.use('/admin', adminRouter)
    app.use('/cart', cartRouter)
}

module.exports = route;
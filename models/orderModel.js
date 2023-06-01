const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: { type: String, ref: 'User' },
    restaurant: { type: String, ref: 'Restaurant' },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const orderModel = mongoose.model('order', orderSchema)

module.exports = { orderModel }



const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    orderName: {
        type: String,
        required: true,
    },
    orderTime: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    orderRecipes: {
        type: [String],
        required: true,
    },
});

const RestaurantOrder = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [ItemSchema],
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", RestaurantOrder);

module.exports = Order;

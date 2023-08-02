const Order = require('../../models/RestaurantOrder');

const CreateOrder = async (req, res) => {
    const orderDetails = req.body.data;

    try {
        const orderCreated = await Order.create(
            {
                user: orderDetails.userId,
                items: [{
                    orderName: orderDetails.items[0].orderName,
                    orderTime: orderDetails.items[0].orderTime,
                    price: orderDetails.items[0].orderPrice,
                    quantity: orderDetails.items[0].orderQuantity,
                    orderRecipes: orderDetails.items[0].orderRecipies
                }],
                totalPrice: orderDetails.totalPrice
            }
        )

        return res.status(200).json(orderCreated);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Can't create orders" })
    }
};

const getOrders = async (req, res) => {
    const userId = req.query.userId;

    try {
        const userOrder = await Order.find({
            $and: [
                { 'user': userId }
            ]
        })
            .populate('user', 'name')
            .exec()

        return res.status(200).json(userOrder);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Can't get orders" });
    }
};

const deleteOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const orderDeleted = await Order.findOneAndDelete({ _id: orderId });

        return res.status(200).json(orderDeleted);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Can't delete order" });
    }
};

const findOrder = async (req, res) => {
    const orderName = req.query.orderName;

    try {
        const orderFind = await Order.find({
            "items.orderName": { $regex: orderName, $options: "i" }
        })
        console.log(orderFind)
        return res.status(200).json(orderFind);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Can't find order" });
    }
};

const getOneOrder = async (req, res) => {
    const orderId = req.query.orderId;

    try {
        const orderFind = await Order.findById(orderId);

        if (!orderFind) {
            return res.status(404).json({ message: "Order not found" });
        }

        console.log(orderFind);
        return res.status(200).json(orderFind);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Can't find order" });
    }
};

module.exports = {
    CreateOrder,
    getOrders,
    deleteOrder,
    findOrder,
    getOneOrder
};
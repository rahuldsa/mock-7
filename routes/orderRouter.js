const express = require("express");
const { orderModel } = require("../models/orderModel")

const orderRouter = express.Router();

// POST /api/orders
orderRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const order = new orderModel(payload);
        await order.save();
        res.status(201).send({ msg: "Order Registered", order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// GET /api/orders/:id
orderRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.error('Error catching order details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// PATCH /api/orders/:id
orderRouter.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        await order.save();
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { orderRouter };

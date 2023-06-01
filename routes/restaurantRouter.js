const express = require("express");
const { restaurantModel } = require("../models/restaurantModel")

const restaurantRouter = express.Router();

// Get all Restaurants
restaurantRouter.get("/", async (req, res) => {
    try {
        const restaurants = await restaurantModel.find();
        res.status(200).send({ msg: "All Restaurants", restaurants });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Get Restaurants by restaurant id
restaurantRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const restaurant = await restaurantModel.findOne({ _id: id });
        res.status(200).send({ msg: "Restaurant Details by ID", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Register Restaurant
restaurantRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const restaurant = new restaurantModel(payload);
        await restaurant.save();
        res.status(201).send({ msg: "Restaurant Registered Successfully", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Update Restaurant
restaurantRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const restaurant = await restaurantModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(204).send({ msg: "Restaurant Data Updated", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Delete Restaurant
restaurantRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const restaurant = await restaurantModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ msg: "Restaurant Deleted", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// GET /api/restaurants/:id/menu
restaurantRouter.get('/:id/menu', async (req, res) => {
    try {
        const { id } = req.params;
        const restaurants = await restaurantModel.findById(id);
        if (!restaurants) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        return res.status(200).json(restaurants.menu);
    } catch (error) {
        console.error('Error retrieving restaurant menu:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// POST /api/restaurants/:id/menu
restaurantRouter.post('/:id/menu', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image } = req.body;
        const restaurant = await restaurantModel.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        restaurant.menu.push({ name, description, price, image });
        await restaurant.save();
        return res.status(201).json({ message: 'Menu item added successfully' });
    } catch (error) {
        console.error('Error adding menu item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /api/restaurants/:restaurantId/menu/:itemId
restaurantRouter.delete('/:restaurantId/menu/:itemId', async (req, res) => {
    try {
        const { restaurantId, itemId } = req.params;
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        const itemIndex = restaurant.menu.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        restaurant.menu.splice(itemIndex, 1);
        await restaurant.save();
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { restaurantRouter };

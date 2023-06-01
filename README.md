# Food Delivery App Backend

This is the backend repository for a Food Delivery app that allows users to order food from their favorite restaurants. The backend is built using Node.js, Express.js, and MongoDB as the stack.

## Features

1. Login / Signup: Allows users to log in or sign up for an account.
2. Updating User's Password: Enables users to update their password by providing the current password and the new password.
3. Get all Restaurants: Retrieves a list of all available restaurants.
4. Get a Restaurant by ID: Retrieves the details of a specific restaurant based on its ID.
5. Get a Restaurant by ID and its Menu: Retrieves the details of a specific restaurant, including its menu, based on the restaurant's ID.
6. Add a New Menu to a Specific Restaurant: Allows users to add a new menu item to a specific restaurant.
7. Delete a Menu from a Specific Restaurant: Allows users to delete a menu item from a specific restaurant.
8. Creating an Order: Enables users to create orders for food delivery.
9. Get Specific Order Details: Retrieves detailed information about a specific order based on its ID.
10. Update Specific Order: Allows users to update the status of a specific order based on its ID.

## Tech Stack Used

Node.js, Express.js, Mongoose

Database: MongoDB

## Run Locally

Install dependencies- npm install
Start the server- npm run server

## Environment Variables

To run the project, you will need to add a .env file

`mongoURL`
`PORT`
`salt`
`secret`

## API's endpoint:

POST - /api/register
Description: This endpoint allows users to register by creating a new account. The password should be hashed before storing it.
Status Code: 201

POST - /api/login
Description: This endpoint allows users to log in and returns a JWT token upon successful login.
Status Code: 201

PUT / PATCH - /api/user/:id/reset
Description: This endpoint allows users to reset their password by providing the current password and new password in the request body. The :id parameter should be replaced with the user's ID.
Status Code: 204

GET - /api/restaurants
Description: This endpoint returns a list of all available restaurants.
Status Code: 200

GET - /api/restaurants/:id
Description: This endpoint returns the details of a specific restaurant identified by its ID.
Status Code: 200

GET - /api/restaurants/:id/menu
Description: This endpoint returns the menu of a specific restaurant identified by its ID.
Status Code: 200

POST / PUT - /api/restaurants/:id/menu
Description: This endpoint allows the user to add a new item to a specific restaurant's menu identified by its ID.
Status Code: 201

DELETE - /api/restaurants/:id/menu/:id
Description: This endpoint allows the user to delete a particular menu item identified by its ID from a specific restaurant.
Status Code: 202

POST - /api/orders
Description: This endpoint allows the user to place an order.
Status Code: 201

GET - /api/orders/:id
Description: This endpoint returns the details of a specific order identified by its ID.
Status Code: 200

PUT / PATCH - /api/orders/:id
Description: This endpoint allows users to update the status of a specific order identified by its ID.
Status Code: 204

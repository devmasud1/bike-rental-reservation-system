## Bike Rental Reservation System Backend

##### live-Site:: [https://bike-rental-service-azure-seven.vercel.app/](https://bike-rental-service-azure-seven.vercel.app/)

This project serves as the backend for a bike rental reservation system, facilitating the management of users, bikes, and rentals. It provides essential functionalities for user authentication and authorization, bike inventory management, and rental operations. The system ensures data consistency through input validation and robust error handling mechanisms.

#### Features

1. User authentication and authorization
2. Bike CRUD operations
3. Rental management
4. Input validation using Zod
5. Error handling

#### Technologies Used

- Programming Language: TypeScript
- Web Framework: Express.js
- ODM & Validation Library: Zod, Mongoose for MongoDB

#### Installation

##### Prerequisites

- Node.js
- MongoDB

#### Steps

1. Clone the repository:
   - git clone <https://github.com/devmasud1/bike-rental-reservation-system>
   - cd bike-rental-reservation-system
2. Install the dependencies:
   - npm install
3. Create a .env file in the root directory and add your environment variables:
   - NODE_ENV=development
   - PORT=5000
   - DB_URL=your_mongodb_uri_here
   - BCRYPT_SALT_ROUNDS=your_salt_here
   - JWT_ACCESS_TOKEN=your_secret_key_here
   - JWT_REFRESH_TOKEN=your_secret_key_here
4. Start the development server:
   - npm run start:dev

#### API Endpoints

##### User Routes

1. Sign Up
   Route: /api/auth/signup (POST)
2. User Login
   Route: /api/auth/login (POST)
3. Get Profile
   Route: /api/users/me (GET)
   Request Headers: Authorization: Bearer jwt_token
4. Update Profile
   Route: /api/users/me (PUT)
   Request Headers: Authorization: Bearer jwt_token

##### Bike Routes

1. Create Bike (Admin Only)
   Route: /api/bikes (POST)
   Request Headers: Authorization: Bearer jwt_token
2. Get All Bikes
   Route: /api/bikes (GET)
3. Update Bike (Admin Only)
   Route: /api/bikes/:id (PUT)
   Request Headers: Authorization: Bearer jwt_token
4. Delete Bike (Admin Only)
   Route: /api/bikes/:id (DELETE)
   Request Headers: Authorization: Bearer jwt_token

##### Rental Routes

1. Create Rental
   Route: /api/rentals (POST)
   Request Headers: Authorization: Bearer jwt_token
2. Return Bike (Admin Only)
   Route: /api/rentals/:id/return (PUT)
   Request Headers: Authorization: Bearer jwt_token
3. Get All Rentals for User (My rentals)
   Route: /api/rentals (GET)
   Request Headers: Authorization: Bearer jwt_token

##### Middleware and Error Handling

1. No Data Found
   When finding data, if the database collection is empty or does not match any data, the API will return a generic message: "No data found."
2. 404 Not Found
   If a route does not exist, the API will return a 404 error with a message.
3. Authentication Error
   If a user tries to access a route they are not authorized to access, the API will return a 401 error with a message.
4. Validation Error
   The API employs Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.
5. Duplicate Entry Error
   When a duplicate entry is attempted, such as registering with an already existing email, the API will return a detailed error message.
6. Cast Error
   When an invalid ID is provided, resulting in a Mongoose CastError, the API will return a 400 error with a message.

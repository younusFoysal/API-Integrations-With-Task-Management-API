


# API-Integrations With Task Management API

A simple **Task Management API** built with **Node.js**, **Express.js**, and **MongoDB**, featuring:
- User authentication with JWT tokens
- Task CRUD operations
- CSV import/export functionality
- Middleware-based route protection

---

## Project Structure

```plaintext
project/
├── src/
│   ├── models/            # Database models
│   │   ├── user.js        # User schema for authentication
│   │   ├── data.js        # Task schema
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   ├── data.js        # Task routes
│   ├── controllers/       # Route logic
│   │   ├── authController.js # Authentication logic
│   │   ├── dataController.js # Task management logic
│   ├── middlewares/       # Middleware functions
│   │   ├── authMiddleware.js # JWT token verification
│   ├── utils/             # Utility functions
│   │   ├── csvHandler.js  # Import/export CSV handling
│   ├── config/            # Configuration files
│   │   ├── db.js          # MongoDB connection setup
├── app.js                 # Main entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── README.md              # Project documentation
```

---

## Features

1. **Authentication:**
    - User registration with hashed passwords.
    - Login functionality with JWT-based authentication.
    - Route protection using middleware.

2. **Task Management:**
    - Create, Read, Update, and Delete tasks.
    - Tasks linked to authenticated users.

3. **CSV Import/Export:**
    - Import tasks from a CSV file.
    - Export tasks to a CSV file.

---

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Steps to Set Up

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/task-management-api.git
   cd task-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root and add the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskdb
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the MongoDB server (if running locally) and seed your database as needed.

5. Start the API:
   ```bash
   npm start
   ```

6. The API will be running on `http://localhost:5000`.

---

## API Usage

### Authentication Routes

| Method | Endpoint         | Description                 | Auth Required |
|--------|------------------|-----------------------------|---------------|
| POST   | `/auth/register` | Register a new user         | No            |
| POST   | `/auth/login`    | Log in with credentials     | No            |

#### Request Body for `/auth/register` and `/auth/login`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Routes

| Method | Endpoint              | Description                       | Auth Required |
|--------|-----------------------|-----------------------------------|---------------|
| GET    | `/tasks`              | Fetch all tasks for a user        | Yes           |
| POST   | `/tasks`              | Create a new task                 | Yes           |
| PUT    | `/tasks/:id`          | Update a task by ID               | Yes           |
| DELETE | `/tasks/:id`          | Delete a task by ID               | Yes           |
| POST   | `/tasks/import`       | Import tasks from a CSV file      | Yes           |
| GET    | `/tasks/export`       | Export tasks to a CSV file        | Yes           |

#### Task Example Object
```json
{
  "title": "Finish project",
  "description": "Complete the API by Monday",
  "status": "in-progress"
}
```

---

## CSV Import/Export

1. **Import:**
    - Endpoint: `POST /tasks/import`
    - Attach a CSV file with headers matching the task fields (`title`, `description`, `status`).

2. **Export:**
    - Endpoint: `GET /tasks/export`
    - Downloads a CSV file containing all tasks created by the authenticated user.

---

## Middleware

- **`authMiddleware.js`**: Verifies JWT tokens and attaches the user to the request object for protected routes.

---

## Scripts

- **Start Application:**
  ```bash
  npm start
  ```

---

## Dependencies

| Package      | Description                  |
|--------------|------------------------------|
| bcryptjs     | Password hashing             |
| csv-parser   | Parse CSV files              |
| dotenv       | Manage environment variables |
| express      | Web framework                |
| jsonwebtoken | JWT authentication           |
| json2csv     | Convert JSON to CSV          |
| mongoose     | MongoDB object modeling      |
| multer       | To upload files              |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, open an issue to discuss your ideas.


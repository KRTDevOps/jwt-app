# JWT Authentication App

A full-stack authentication system with JWT (JSON Web Tokens) built with React, Vite, Express, and MySQL. Features user registration, login, and a protected dashboard with responsive Tailwind CSS design.

## Features

- **User Registration** — Create new accounts with name, email, and password
- **User Login** — Authenticate users with email and password
- **JWT Authentication** — Secure token-based session management
- **Protected Dashboard** — Access restricted content after login
- **Responsive Design** — Mobile-first Tailwind CSS layouts
- **User Profile Display** — Show logged-in user name and email on dashboard
- **Session Management** — Logout functionality and session control

## Tech Stack

### Frontend
- **React 18** — UI framework
- **Vite** — Fast build tool and dev server
- **React Router** — Client-side routing
- **Axios** — HTTP client
- **Tailwind CSS** — Utility-first CSS framework

### Backend
- **Node.js** — Runtime environment
- **Express** — Web server framework
- **MySQL** — Database
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT token generation and verification
- **CORS** — Cross-origin resource sharing

## Project Structure

```
jwt-app/
├── client/
│   └── vite-project/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── login.jsx          # Login page with responsive layout
│       │   │   ├── register.jsx       # Registration page
│       │   │   └── dashboard.jsx      # Protected dashboard with user info
│       │   ├── App.jsx                # Route configuration
│       │   ├── main.jsx               # React entry point
│       │   ├── index.css              # Global styles with Tailwind directives
│       │   └── assets/
│       ├── public/
│       ├── tailwind.config.js         # Tailwind CSS configuration
│       ├── postcss.config.js          # PostCSS configuration
│       ├── vite.config.js             # Vite configuration
│       └── package.json
├── server/
│   ├── server.js                      # Express app and routes setup
│   ├── db.js                          # MySQL connection pool
│   ├── package.json
│   ├── config/                        # Configuration files
│   ├── controllers/
│   │   └── authcontroller.js          # Registration and login handlers
│   ├── middleware/
│   │   └── jwtmiddleware.js           # JWT verification middleware
│   └── routes/
│       └── routes.js                  # API routes
└── README.md                          # This file
```

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (v8 or later)
- **MySQL** (v5.7 or later)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/KRTDevOps/jwt-app.git
cd jwt-app
```

### 2. Set up the database

Create a MySQL database and tables:

```sql
CREATE DATABASE student_management;

USE student_management;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Install server dependencies

```bash
cd server
npm install
```

Update `db.js` with your MySQL credentials:

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'student_management'
});
```

### 4. Start the backend server

```bash
npm start
```

The server will run on `http://localhost:5000`

### 5. Install client dependencies

```bash
cd ../client/vite-project
npm install
```

### 6. Start the development server

```bash
npm run dev
```

The client will run on `http://localhost:5173`

## Usage

### Register a New User

1. Navigate to the **Register** page (`/register`)
2. Enter your name, email, and password
3. Click the Register button
4. You'll be redirected to the login page

### Login

1. Enter your email and password on the **Login** page (`/`)
2. Click the Sign in button
3. Your JWT token is stored in localStorage
4. You'll be redirected to the **Dashboard**

### Dashboard

- View your logged-in name and email
- See the current session status
- Click **Logout** to end your session and return to login

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Authenticate and receive JWT token |
| GET | `/api/dashboard` | Get dashboard data (requires valid JWT) |

### Request/Response Examples

**Register:**
```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login:**
```bash
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Dashboard (Protected):**
```bash
GET /api/dashboard
Authorization: Bearer <jwt_token>

Response:
{
  "msg": "You have access to the dashboard"
}
```

## JWT Token Structure

The JWT token payload contains:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "iat": 1234567890,
  "exp": 1234571490
}
```

## Security Features

- **Password Hashing** — bcryptjs with salt rounds
- **JWT Tokens** — Secure token-based authentication
- **Protected Routes** — Middleware validates tokens before access
- **CORS Enabled** — Cross-origin requests from frontend
- **Token Expiration** — Tokens expire after a set time

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_management
JWT_SECRET=your_secret_key
PORT=5000
```

## Build for Production

### Frontend

```bash
cd client/vite-project
npm run build
```

Output will be in the `dist/` folder.

### Backend

Ensure environment variables are set and run:

```bash
cd server
npm start
```

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### MySQL connection errors
- Verify MySQL is running
- Check credentials in `db.js`
- Ensure the database exists

### CORS errors
- Frontend and backend must run on correct ports (5173 and 5000)
- CORS is enabled in `server.js`

### JWT errors
- Ensure token is sent with `Authorization: Bearer <token>` header
- Check token expiration time

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by GitHub Copilot**

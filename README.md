# ZingBE – Backend API

ZingBE is the backend service powering the **Zing application**, a real-time social networking platform with chat, user connections, authentication, and secure payments.

This backend is built with **Node.js, Express, MongoDB, and Socket.IO** and provides REST APIs and real-time communication features for the Zing frontend.

---

## 🚀 Features

* User Authentication (JWT based)
* User Profile Management
* User Connections / Networking
* Real-time Chat using Socket.IO
* Secure Payments using Razorpay
* Cookie-based session handling
* MongoDB database integration
* Modular and scalable project architecture

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **Socket.IO**
* **JWT Authentication**
* **Razorpay Payment Gateway**
* **bcrypt (Password Hashing)**
* **CORS & Cookie Parser**

---

## 📁 Project Structure

```
ZingBE
│
├── src
│   ├── config        # Database configuration
│   ├── middlewares   # Authentication and custom middleware
│   ├── models        # Mongoose database models
│   │
│   ├── routes        # API route controllers
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── profile.js
│   │   ├── connection.js
│   │   ├── payment.js
│   │   └── chat.js
│   │
│   ├── utils         # Utility functions
│   │   ├── socket.js
│   │   ├── razorpay.js
│   │   ├── validation.js
│   │   └── constants.js
│   │
│   └── app.js        # Main server entry point
│
├── package.json
├── .env
└── .gitignore
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```
PORT=7777
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_TEST_KEY=your_razorpay_key
RAZORPAY_SECRET_KEY=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

---

## 📦 Installation

Clone the repository:

```
git clone https://github.com/your-username/ZingBE.git
cd ZingBE
```

Install dependencies:

```
npm install
```

---

## ▶️ Running the Server

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

Server will start on:

```
http://localhost:7777
```

---

## 🌐 API Endpoints

### Authentication

```
POST /signup
POST /login
POST /logout
```

### User

```
GET /user/profile
GET /users
```

### Connections

```
POST /request
POST /accept
GET /connections
```

### Chat

```
GET /chat/messages
POST /chat/send
```

### Payments

```
POST /payment/create-order
POST /payment/verify
```

---

## 🔌 Real-Time Communication

The backend uses **Socket.IO** to enable real-time messaging between users.

Socket initialization is handled in:

```
src/utils/socket.js
```

---

## 🚀 Deployment

This backend can be deployed on:

* Render
* Railway
* AWS
* DigitalOcean
* Vercel (serverless)

Example deployment used for this project:

**Render Web Service**

Build Command:

```
npm install
```

Start Command:

```
npm start
```

---

## 🔐 Security

* Passwords hashed with **bcrypt**
* JWT based authentication
* Secure cookies enabled
* Environment variables for secrets

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Developed by **Rakesh Singh**

If you like this project, feel free to ⭐ the repository.

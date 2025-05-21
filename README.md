# 📖 Story Book

**Story Book** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that enables users to document and share their travel experiences. Users can create, view, and manage travel stories, complete with images and detailed descriptions.

## 🚀 Features

- **User Authentication**: Secure signup and login functionalities with JWT-based authentication.
- **Email Verification**: Users receive verification emails to confirm their accounts.
- **Password Management**: Features for password reset and recovery.
- **Travel Stories**: Create, read, update, and delete travel stories with associated images.
- **Image Uploads**: Upload images either to the server or integrate with Cloudinary for cloud storage.
- **Protected Routes**: Certain routes are protected and require valid authentication tokens.
- **Global Error Handling**: Centralized error handling for consistent error responses.

## 🛠️ Technologies Used

- **Frontend**: React.js, React Router, Axios, Zustand
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer, Cloudinary
- **Email Services**: Nodemailer
- **Environment Variables**: dotenv

## 📂 Project Structure

```
story-book/
├── client/                    # React frontend
│   ├── public/                # Static assets
│   ├── src/                   # React source files
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Reusable React components
│   │   │   ├── FloatingShape.jsx
│   │   │   ├── Input.jsx
│   │   │   └── PasswordStrength.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Auth/          # Authentication-related pages
│   │   │   │   ├── EmailVerification.jsx
│   │   │   │   ├── ForgetPassword.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── ResetPassword.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   └── Home/          # Home page
│   │   │       └── Home.jsx
│   │   ├── store/             # State management with Zustand
│   │   │   └── authStore.js   # Authentication state management
│   │   ├── App.css            # Global styles
│   │   ├── index.css          # Entry styles
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # React entry point
│   ├── .gitignore
│   ├── index.html             # HTML template
│   ├── eslint.config.js       # ESLint configuration
│   ├── vite.config.js         # Vite configuration
│   ├── package-lock.json
│   └── package.json
├── server/                    # Express backend
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── uploads/               # Uploaded images (if stored locally)
│   ├── .env                   # Environment variables
│   └── server.js              # Entry point
├── README.md
└── package.json
```

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- [MongoDB](https://www.mongodb.com/) installed and running
- [Cloudinary](https://cloudinary.com/) account (optional, for image uploads)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The application will be available at `http://localhost:3000`.

## 🧪 API Endpoints

### Authentication Routes
- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Authenticate user and return token
- `POST /api/auth/logout` – Logout user
- `POST /api/auth/verify-email` – Verify user's email
- `POST /api/auth/forgot-password` – Initiate password reset
- `POST /api/auth/reset-password/:token` – Reset password
- `GET /api/auth/check-auth` – Check authentication status

### Travel Story Routes
- `POST /api/travel/add-travel-story` – Add a new travel story (protected)
- `GET /api/travel/get-all-travel-stories` – Retrieve all travel stories for the authenticated user (protected)
- `POST /api/travel/image-upload` – Upload an image for a travel story (protected)

## 🛡️ Authentication & Authorization

- **JWT Tokens**: Upon successful login, a JWT token is issued and must be included in the `Authorization` header (`Bearer <token>`) for protected routes.
- **Zustand State Management**: The `authStore.js` uses Zustand to manage authentication state (e.g., user login status, token) on the frontend.
- **Middleware**: The `verifyToken` middleware ensures only authenticated users access protected routes.

## 🖼️ Image Uploads

- **Local Storage**: Images are stored in the `server/uploads/` directory by default.
- **Cloudinary**: Optionally upload images to Cloudinary by configuring credentials in the `.env` file.

## ⚠️ Error Handling

A centralized error handler ensures consistent error responses and logging across the application.

## 📧 Email Services

Nodemailer is used for sending verification and password reset emails. Configure email service credentials in the `.env` file.

## 🤝 Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make and commit changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request on GitHub.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact

For inquiries or support, reach out to [awoladh04@gmail.com](mailto:awoladh04@gmail.com) or open an issue on this repository.

Happy storytelling! 🌍
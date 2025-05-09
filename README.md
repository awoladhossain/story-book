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

- **Frontend**: React.js, React Router, Axios
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
│   ├── public/
│   └── src/
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

- Node.js and npm installed
- MongoDB installed and running
- Cloudinary account (optional, for image uploads)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `server` directory and add the following:
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

- **JWT Tokens**: Upon successful login, a JWT token is issued and must be included in the `Authorization` header for protected routes.
- **Middleware**: The `verifyToken` middleware checks for the presence and validity of the JWT token before granting access to protected routes.

## 🖼️ Image Uploads

- **Local Storage**: Images are stored in the `uploads/` directory on the server.
- **Cloudinary Integration**: Alternatively, images can be uploaded to Cloudinary. Ensure Cloudinary credentials are set in the `.env` file.

## ⚠️ Error Handling

A global error handler middleware captures and processes errors throughout the application, ensuring consistent error responses and logging.

## 📧 Email Services

Utilizes Nodemailer to send verification and password reset emails. Configure your email service credentials in the `.env` file.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For any inquiries or support, please contact [awoladh04@gmail.com].

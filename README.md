# Soft Drink E-commerce Demo

This repository has been emptied as requested.


![Project Screenshot](frontend/public/cool1.png)

## 🚀 Live Demo
Vercel : https://soft-drink-e-commerce-demo.vercel.app/
Check out the live demo deployed on Render:
[https://soft-drink-e-commerce-demo.onrender.com](https://soft-drink-e-commerce-demo.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - Declarative routing for React
- **CSS3** - Styling and responsive design
- **Context API** - State management for shopping cart

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling tool
- **JWT** - JSON Web Tokens for authentication

## 📁 Project Structure

```
Soft-Drink-E-commerce-Demo/
├── backend/
│   ├── middleware/     # Authentication middleware
│   ├── models/         # Database models (User, Drink)
│   ├── routes/         # API routes (auth, drinks, checkout)
│   ├── uploads/        # Uploaded product images
│   ├── index.js        # Entry point
│   └── .env            # Environment variables
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React context (CartContext)
│   │   ├── pages/      # Page components
│   │   ├── config/     # API configuration
│   │   └── App.js      # Main app component
│   └── package.json    # Frontend dependencies
└── README.md           # This file
```

## 🌟 Key Features

### User Features
- Browse soft drink products with images and descriptions
- Search and filter products
- Add items to shopping cart
- View cart and update quantities
- Simulated checkout process
- View trending products

### Admin Features
- User authentication (login/signup)
- Add new drink products with images
- Manage product inventory
- Admin panel for product management

### UI/UX Features
- Responsive design (mobile-friendly)
- Modern, clean interface
- Intuitive navigation
- Loading states and error handling

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (comes with Node.js)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=8090
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will be running at `http://localhost:8090`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will open in your browser at `http://localhost:3000`

### Running Both Servers Concurrently
From the frontend directory:
```bash
npm run dev
```

## 📱 Pages

- **Home** - Featured products and promotions
- **Shop** - Browse all soft drinks
- **About** - Company information
- **Contact** - Contact form
- **Cart** - Shopping cart review
- **Login/Signup** - User authentication
- **Admin Panel** - Add/manage products
- **Trending** - Popular products

## 🔐 Authentication

The application implements JWT-based authentication:
- Users can register and log in
- Protected routes for admin features
- Secure password storage with bcrypt

## 📦 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Drinks
- `GET /api/drinks` - Get all drinks
- `POST /api/drinks` - Add new drink (authenticated)
- `GET /api/drinks/trending` - Get trending drinks

### Checkout
- `POST /api/checkout` - Process order

## 🚢 Deployment

This application is configured for deployment on Render:
1. Create a new web service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Configure build command: `npm run build`
5. Configure start command: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Mahirathood

## 🙏 Acknowledgments

- Created with Create React App
- Powered by Node.js and Express
- Database managed with MongoDB

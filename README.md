# 🔗 URL Shortener

A modern, full-stack URL shortening service that allows users to create short, memorable links and track their performance. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Shorten Long URLs**: Convert lengthy URLs into short, easy-to-share links
- **User Authentication**: Secure signup and login functionality
- **Link Management**: View, edit, and delete your shortened URLs
- **Analytics**: Track click counts and other metrics (coming soon)
- **Responsive Design**: Works on desktop and mobile devices
- **Customizable Links**: Create custom short URLs (premium feature)


## 🖥️ Screenshots

### Homepage

![Homepage](./FRONTEND/public/images/Screenshot%20(983).png)

### Dashboard

![Dashboard](./FRONTEND/public/images/Screenshot%20(984).png)

### Authentication

![Authentication](./FRONTEND/public/images/Screenshot%20(985).png)

### Profile

![Profile](./FRONTEND/public/images/Screenshot%20(987).png)

### URL Management

![URL Management](./FRONTEND/public/images/Screenshot%20(988).png)

## 🛠️ Tech Stack

### Frontend

- **React**: Frontend library for building user interfaces
- **Vite**: Next Generation Frontend Tooling
- **React Router**: For client-side routing
- **Axios**: For making HTTP requests
- **Tailwind CSS**: For styling
- **React Icons**: For icons

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: For authentication
- **CORS**: For handling cross-origin requests


## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized setup)
- (Optional) MongoDB Atlas account (not needed if using Docker)

### 🐳 Docker Setup (Recommended)

This is the easiest way to get the application up and running:

1. **Clone the repository**
   ```bash
   git clone https://github.com/ratanz/url-shortener.git
   cd url-shortener
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - MongoDB: Running on port 27017 (internal to Docker network)

### Manual Installation (Without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/ratanz/url-shortener.git
   cd url-shortener
   ```

2. **Set up the Backend**
   ```bash
   cd BACKEND
   npm install
   ```
   
   Create a `.env` file in the BACKEND directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   APP_URL=http://localhost:3000
   ```

3. **Set up the Frontend**
   ```bash
   cd ../FRONTEND
   npm install
   ```
   
   Create a `.env` file in the FRONTEND directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd BACKEND
   npm start
   ```

2. **Start the Frontend**
   ```bash
   cd ../FRONTEND
   npm run dev
   ```

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 📝 API Documentation

### Authentication

- **Register User**
  ```
  POST /api/auth/register
  ```
  
  **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Login**
  ```
  POST /api/auth/login
  ```
  
  **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### URL Shortening

- **Create Short URL**
  ```
  POST /api/create
  ```
  
  **Request Body:**
  ```json
  {
    "url": "https://example.com/very/long/url"
  }
  ```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

Ratan - [@your_twitter](https://twitter.com/your_twitter) - your.email@example.com

Project Link: [https://github.com/ratanz/url-shortener](https://github.com/ratanz/url-shortener)

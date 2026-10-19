# 🎓 LearnHub - MERN Stack Learning Management System

LearnHub is a full-stack Learning Management System (LMS) built using the MERN stack (MongoDB, Express.js, React.js, Node.js)[cite: 1]. It provides a secure, role-based platform where **Students** can browse and enroll in courses, **Instructors** can create and manage course curriculums, and **Admins** can oversee platform metrics and manage user accounts[cite: 1].

---

## 🚀 Key Features

### 👤 Student Portal
- **Course Browsing & Search:** View available courses, prices, and detailed curriculum modules[cite: 1, 25, 26].
- **Enrollment System:** Single-active enrollment restriction logic with instant portal access[cite: 1, 4, 9].
- **My Dashboard:** Access enrolled course materials and video lectures anytime[cite: 1, 19].

### 👨‍🏫 Instructor Studio
- **Course Management (CRUD):** Create, edit, update, and delete courses[cite: 1, 16, 17, 18, 30, 31, 32].
- **Lesson Builder:** Add video lectures, lecture titles, and durations to published courses[cite: 1, 15].
- **Program Dashboard:** Track hosted courses and published video content[cite: 1, 18].

### 🛡️ Central Administration
- **Analytics Dashboard:** Monitor total enrolled students, active instructors, and hosted courses[cite: 1, 20].
- **User Management:** Manage registered accounts, modify user roles (Admin, Instructor, Student), or remove users[cite: 1, 21].
- **Catalog Control:** Platform-wide oversight to manage or purge listed courses[cite: 1, 20].

---

## 🛠️ Technologies Used

### Frontend
- **React.js** (Vite)[cite: 1, 5]
- **React Router DOM** (Client-side routing)[cite: 1]
- **Axios** (HTTP client for API requests)[cite: 1, 5]
- **Bootstrap / Custom CSS** (Responsive UI components & Toast alerts)[cite: 1, 13, 14]
- **React Context API** (Global state management for Auth)[cite: 1, 5]

### Backend
- **Node.js** & **Express.js** (RESTful API Server)[cite: 1, 29]
- **MongoDB** & **Mongoose** (Database ORM & Schema modelling)[cite: 1, 29]
- **JSON Web Tokens (JWT)** (Secure authentication & authorization middleware)[cite: 1, 8, 29]
- **Bcrypt.js** (Password hashing)[cite: 1]
- **Dotenv** (Environment variable management)[cite: 1, 29]
- **CORS** (Cross-Origin Resource Sharing)

---

## 📂 Project Structure

```text
Final Project/
├── backend/
│   ├── Controller/        # Express controllers (user, course, enrollment)
│   ├── middlewares/       # JWT auth & role validation middlewares
│   ├── models/            # Mongoose schemas (User, Course, Enrollment)
│   ├── Routes/            # API endpoints (userRouter, courseRouter, enrollmentRouter)
│   ├── .env               # Environment configuration
│   └── server.js          # Express app initialization
│
└── frontend/
    ├── src/
    │   ├── assets/        # Visual assets & images
    │   ├── components/    # Reusable UI components (Navbar, Modals, Cards)
    │   ├── context/       # AuthContext for global session state
    │   ├── middlewares/    # Protected route wrappers
    │   ├── pages/         # Page views (Home, CourseDetails, Dashboards, Auth)
    │   ├── services/      # Axios API configuration
    │   ├── App.jsx        # Route definitions
    │   └── main.jsx       # Application entry point
⚙️ Installation & Setup Instructions
Follow these steps to run the project locally on your machine:

Prerequisites
Node.js (v16.x or higher) installed

MongoDB installed locally or a MongoDB Atlas database URI

Git installed

1. Clone the Repository
git clone [https://github.com/Hammad3168/Final_project.git](https://github.com/Hammad3168/Final_project.git)
cd Final_project

2. Backend Setup
Navigate to the backend folder:
cd backend

3 Install frontend dependencies:
npm install

4. Start the Vite React development server:
npm run dev

The frontend application should now be accessible at http://localhost:5173 (or the port displayed in your terminal).


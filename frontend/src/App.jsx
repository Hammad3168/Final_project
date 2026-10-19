import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pasges/Home";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar.jsx";
import Contact from "./pasges/Contact.jsx";
import Login from "./pasges/Login.jsx";
import Register from "./pasges/RegisterUser.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Courses from "./pasges/Courses.jsx";
import CourseDetails from "./pasges/CourseDetails.jsx";
import Profile from "./pasges/Profile.jsx";
import Footer from "./components/Footer.jsx";
import InstructorDashboard from "./pasges/InstructorDashboard.jsx";
import StudentDashboard from "./pasges/StudentDashboard.jsx";
import AdminDashboard from "./pasges/AdminDashboard.jsx";
import ProtectedRoute from "./middlewares/ProtectedRoute.jsx";

function App() {
  return (
    <div>
      <AppNavbar />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        .
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        .
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

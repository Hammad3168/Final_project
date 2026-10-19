import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { registerUser } from "../services/authService.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser(formData);
      toast.success(data.message || "Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" text-white d-flex align-items-center justify-content-center px-3 py-4">
      <Form
        onSubmit={handleSubmit}
        className="text-white d-flex flex-column align-items-center w-100 p-sm-5 rounded-4 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          maxWidth: "480px",
        }}
      >
        <div className="text-center mb-2">
          <h1 className="h2 fw-bold mb-2">Create your account</h1>
          <p className="text-center text-sm mb-0">
            Join LearnHub and start learning today.
          </p>
        </div>
        <Form.Group className="mb-2 w-100" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2 w-100" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2 w-100" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <p className="text-center mb-2">
          Already have an account?{" "}
          <Link to="/login" className="fw-semibold text-warning">
            Log in
          </Link>
        </p>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="w-100  fw-bold text-white shadow-sm border-0 rounded-3 mb-0 text-black bg-warning"
        >
          {loading ? (
            <span>
              <Spinner />
              Creating an account...
            </span>
          ) : (
            "Register"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default RegisterUser;

import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(formData);
      console.log(data);
      setUser(data.user);
      toast.success(`Welcome to LearnHub! (${data.user.name.toUpperCase()})`);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Somthing went worng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" text-white d-flex align-items-center justify-content-center px-3 py-4">
      <Form
        onSubmit={handelSubmit}
        className="text-white d-flex flex-column justify-content-center align-items-center w-100 p-4 p-sm-5 rounded-4 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          maxWidth: "480px",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="h2 fw-bold mb-2">Login your account</h1>
          <p className="text-center text-sm mb-0">Welcome Back To LearnHub</p>
        </div>
        <Form.Group className="mb-3 w-100" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            autoComplete="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            autoComplete="current-password"
          />
        </Form.Group>
        <p className="text-align-end">
          Don't have an account{" "}
          <Link to={"/register"} className="text-warning">
            Sign up
          </Link>
        </p>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="w-100 py-2 fw-bold text-white shadow-sm border-0 rounded-3 mb-0 text-black bg-warning"
        >
          {loading ? (
            <span className="d-inline-flex align-items-center gap-2">
              <Spinner animation="border" size="sm" />
              Processing...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default Login;

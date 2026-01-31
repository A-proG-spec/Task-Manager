import "../styles/login.css";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password },
      );
      login(data);

      // Check if user is admin before redirecting
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        alert("Access denied. Admin privileges required.");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Show error message without redirecting
      if (err.response?.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else if (err.response?.status === 404) {
        alert("Login service unavailable. Please try again later.");
      } else {
        alert("Login failed. Please check your credentials.");
      }

      // Stay on login page - DON'T navigate
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Olympus" className="login-logo" />
          <h1>OLYMPUS</h1>
          <p>ADMINISTRATION PORTAL</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Admin Email" required />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Password" required />
          </div>

          <button type="submit" className="btn-login">
            ACCESS TERMINAL <i className="fa-solid fa-chevron-right"></i>
          </button>
        </form>

        <div className="login-footer">
          <a href="#">Forgot Credentials?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

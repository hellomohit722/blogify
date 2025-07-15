import { useEffect, useRef, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseUser from "../UserContext/UserContext";
import axiosInstance from "../API/axiosInstance"



export default function LoginForm() {
  
  const navigate = useNavigate(); 

  const containerRef = useRef(null);
  const signUpRef = useRef(null);
  const signInRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/user/signup", {
        name,
        email,
        password,
      });
      toast.success("Signup successful!");
      const container = containerRef.current;
      navigate("/signin");
      container.classList.remove("right-panel-active");

    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log("From handleSignin");

    try {
      const res = await axiosInstance.post("/user/signin", {
        email,
        password,
      });

      toast.success("Login successful!");
      
      navigate("/");

    } catch (error) {
      // ✅ Axios automatically jumps here if status is not 2xx
      toast.error("Invalid credentials");
      console.error("Signin error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const signUpBtn = signUpRef.current;
    const signInBtn = signInRef.current;

    const addPanel = () => container.classList.add("right-panel-active");
    const removePanel = () => container.classList.remove("right-panel-active");

    signUpBtn.addEventListener("click", addPanel);
    signInBtn.addEventListener("click", removePanel);

    return () => {
      signUpBtn.removeEventListener("click", addPanel);
      signInBtn.removeEventListener("click", removePanel);
    };
    // 🧠 This only runs when the component is about to be removed from the screen, 
    // like when you change the page.
  }, []);

  return (
    <div className="main_container">
    <div className="container" ref={containerRef}>

      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup}>
          <h1 className="heading">Create Account</h1>
          <input
          className="input-field"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="input-field"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="input-field"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignin}>
          <h1 className="heading">Login</h1>
          <input
          className="input-field"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="input-field"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay Panels */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="heading">Welcome Back!</h1>
            <p className="para">Please login with your personal info</p>
            <button className="ghost" ref={signInRef}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="heading">Hello, Friend!</h1>
            <p className="para">Enter your personal details to get started</p>
            <button className="ghost" ref={signUpRef}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

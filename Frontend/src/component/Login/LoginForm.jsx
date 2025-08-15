import { useEffect, useRef, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../API/axiosInstance";


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
      await axiosInstance.post("/user/signup", {
        name,
        email,
        password,
      });
      toast.success("Signup successful!");
      const container = containerRef.current;
      navigate("/signin");
      container.classList.remove("right-panel-active");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("User already exists with this email");
      } else {
        toast.error("Signup failed. Please try again.");
      }
      console.error("Signup error:", error);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    // console.log("From handleSignin");
    try {
      await axiosInstance.post("/user/signin", {
        email,
        password,
      });
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      // Axios automatically jumps here if status is not 2xx
      toast.error("Invalid credentials");
      console.error("Signin error:", error);
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
      <div id="wrapper">
        <h1 className="main_heading">Blogify </h1>
        <p className="para_heading">
          AI-Powered & Collaborative Blogging Platform
        </p>
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
                <button className="ghost" ref={signInRef}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="heading">Hello, Friend!</h1>
                <p className="para">
                  Enter your personal details to get started
                </p>
                <button className="ghost" ref={signUpRef}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 class="secheading">Scroll to know about Platform</h4>
          <p className="text">
            Blogify is a modern, full-stack blogging platform designed for
            seamless writing, publishing, and collaboration. Built with React on
            the frontend and Node.js/Express on the backend, it allows users to
            create and manage blog posts with ease. Whether you're a solo writer
            or working as a team, Blogify simplifies content creation while
            offering flexibility and performance.
          </p>
          <div className="bg bg1">
            <h2 className="Desc">Real-Time Collaboration</h2>
          </div>
          <p className="text">
            One of Blogify’s most innovative features is real-time collaborative
            editing, designed to make content creation a truly shared
            experience. Blog owners can instantly create collaboration rooms for
            any post and share the room ID with others. Once joined,
            collaborators can edit the same blog post simultaneously, with
            changes synced instantly for all participants—no refresh required.
            This feature is perfect for co-authors, editors, or teams working on
            shared content, ensuring everyone stays on the same page.
          </p>
          <div className="bg bg2">
            <h2 className="Desc">Quick Summary</h2>
          </div>
          <p className="text">
            Blogify leverages AI-powered assistance to make reading and
            understanding blogs faster and easier. With integrated OpenAI APIs,
            the platform can automatically summarize blog posts into concise key
            points, helping readers grasp the essence without reading the entire
            article. This is especially useful for lengthy or technical posts,
            where quick comprehension is essential.
          </p>
          <div className="bg bg3">
            <h2 className="Desc">Create Blogs with AI</h2>
          </div>
          <p className="text">
            Blogify empowers users to create blogs with AI, transforming ideas
            into publish-ready posts in minutes. By integrating OpenAI’s content
            generation capabilities, the platform can assist in drafting blog
            content based on a user’s topic, keywords, or even a short prompt.
            This feature is ideal for those who struggle with writer’s block,
            need inspiration, or want to speed up their content creation
            process. Users can refine the AI-generated text, add their personal
            touch, and publish instantly. Whether for casual blogging,
            professional articles, or marketing content, Blogify’s AI-assisted
            writing ensures high-quality, engaging posts while saving time and
            effort for creators.
          </p>
        </div>
        <footer className="copy-right">
          © 2025 Blogify. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

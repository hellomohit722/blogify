import "./About.css";

export default function About() {
  return (
    <div className="about-container" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        About Blogify
      </h1>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        <strong>Blogify</strong> is a modern, full-stack blogging platform designed for seamless writing, publishing, and collaboration.
        Built with <strong>React</strong> on the frontend and <strong>Node.js/Express</strong> on the backend, it allows users to create and manage blog posts with ease.
        Whether you're a solo writer or working as a team, Blogify simplifies content creation while offering flexibility and performance.
      </p>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>
        ✍️ Key Features
      </h2>
      <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", fontSize: "1.05rem" }}>
        <li>Rich blog creation with title, body, and cover image support</li>
        <li>Comment system for feedback and discussion</li>
        <li>Secure user authentication and role-based access</li>
        <li>Admin controls for content and user moderation</li>
        <li>Responsive design for both desktop and mobile</li>
      </ul>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>
        🤝 Real-Time Collaboration
      </h2>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        One of the standout features of Blogify is its <strong>real-time collaborative editing</strong>.
        Blog owners can create collaboration rooms and invite others to join and edit the same post simultaneously.
        This is powered by <strong>WebSockets</strong> and provides a Google Docs-like experience where changes are synced live between users.
      </p>

      <p style={{ fontSize: "1rem", color: "#666", marginTop: "2rem" }}>
        Built by <strong>Mohit</strong> — explore the code on 
        <a 
          href="https://github.com/hellomohit722/blogify" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ marginLeft: "0.25rem", color: "#007BFF", textDecoration: "underline" }}
        >
          GitHub
        </a>.
      </p>
    </div>
  );
}

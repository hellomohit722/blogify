import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import UseUser from "../UserContext/UserContext";
import "./Home.css";
import axiosInstance from "../API/axiosInstance";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const { CurrentUser: user, AllBlogs: blogs } = UseUser();
  const { setCurrentUser, setAllBlogs } = UseUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/home");
        setCurrentUser(res.data.user);
        const blogs = res.data.blogs || [];
        setAllBlogs(blogs);
      } catch (error) {
        navigate("/signin");
        console.error("Error fetching home data:", error);
      }
    };
    fetchData();
  }, []);

const handleDelete = async (blogId) => {
  const confirm = window.confirm("Are you sure you want to delete this blog?");
  if (!confirm) return;

  try {
    const res = await axiosInstance.delete(`/blog/delete/${blogId}`);
    toast.success("Blog deleted successfully");
    setAllBlogs(res.data.blogs);
  } catch (error) {
    toast.error("Failed to delete blog");
    console.error("Delete error:", error);
  }
};

  return (
    <div className="home-container">
    <h1 className="home-title">Welcome {user?.name}</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-card"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <div
                style={{ width: "100%", height: "200px", overflow: "hidden" }}
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="card-img"
                />
              </div>
              <div className="blog-card-body">
                <h5 className="blog-card-title">{blog.title}</h5>

                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <Link to={`/blog/${blog._id}`} className="blog-view-link">
                    View
                  </Link>
                </button>

                {user.role === "admin" && (
                  <button
                    className="delete_btn"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <footer className="copy-right">
        © 2025 Blogify. All rights reserved.
      </footer> */}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseUser from "../UserContext/UserContext";
import toast from "react-hot-toast";
import "./Blog.css";
// import Home from "../Home/Home";
import axiosInstance from "../API/axiosInstance";
import CircularIndeterminate from "./CircularIndeterminate";
const baseURL = axiosInstance.defaults.baseURL;
import { useNavigate } from "react-router-dom";
import ChatbotToggle from "../ChatBot/ChatbotToggle";
import ChatWindow from "../ChatBot/ChatWindow";

export default function ViewBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { CurrentUser: user, setCurrentUser } = UseUser();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axiosInstance.get(`/blog/${id}`);

        setBlog(res.data.blog);

        setComments(res.data.comments);

        const homeRes = await axiosInstance.get("/home");
        setCurrentUser(homeRes.data.user);
      } catch (err) {
        navigate("/"); // Redirect to home if blog not found
        toast.error("Failed to fetch blog. Please try again.");
        console.error("Error fetching blog:", err);
      }
    }
    fetchBlog(); // why this function is called here
    // The function fetchBlog is defined and immediately invoked to fetch the blog data when the component mounts.
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/blog/comment/${id}`, {
        content,
        user,
      });
      toast.success("Comment added successfully!");
      setContent("");
      const res = await axiosInstance.get(`/blog/${id}`);
      setComments(res.data.comments);
    } catch (err) {
      toast.error("Failed to add comment. Please try again.");
      console.error("Comment submit failed:", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.delete(`/blog/comment/${commentId}`);
      toast.success("Comment deleted successfully!");

      const res = await axiosInstance.get(`/blog/${id}`);
      setComments(res.data.comments);
    } catch (err) {
      toast.error("Failed to delete comment.");
      console.error("Error deleting comment:", err);
    }
  };

  if (!blog) return <CircularIndeterminate className="loading-spinner" />; // Show loading spinner if blog is not yet fetched

  return (
    <div className="blog-container">
      <h1 className="blog-title">{blog.title}</h1>
      <div className="blog-image-wrapper">
        <img
          src={blog.coverImage}
          alt="Blog Cover"
          className="blog-cover-image"
          style={{ width: "500px", height: "300px", objectFit: "cover" }}
        />
      </div>
      <p className="blog-body">{blog.body}</p>

      <div className="blog-author-wrapper">
        <img
          src={`${baseURL}${blog.createdBy.profileImage}`}
          alt="Author"
          className="blog-author-image"
          style={{ width: "50px", height: "50px" }}
        />
        <span className="font-medium">Created By {blog.createdBy.name}</span>
      </div>
      <div className="comment-section">
        <h2 className="comment-heading">Comments</h2>
        {user && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your comment"
              className="comment-input"
              required
            />
            <button type="submit" className="comment-button">
              Add
            </button>
          </form>
        )}
      </div>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "600" }}>
        Comment ({comments.length})
      </h1>
      <div className="comment-Blog">
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="comment-card-header">
                {user?.role === "admin" && (
                  <span
                    className="comment-delete"
                    onClick={() => handleDelete(comment._id)}
                  >
                    ❌
                  </span>
                )}
                <div className="comment-card-user">
                  <img
                    src={`${baseURL}${comment.createdBy.profileImage}`}
                    alt="User"
                    className="comment-user-image"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="comment-user-name">
                    {comment.createdBy.name}
                  </span>
                </div>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <ChatbotToggle onClick={() => setShowChatbot(!showChatbot)} />
        {showChatbot && <ChatWindow blogId={id} />}
      </div>
    </div>
  );
}

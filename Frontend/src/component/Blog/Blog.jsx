import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UseUser from "../UserContext/UserContext";
import toast from "react-hot-toast";
import axiosInstance from "../API/axiosInstance";
import CircularIndeterminate from "./CircularIndeterminate";
import ChatbotToggle from "../ChatBot/ChatbotToggle";
import ChatWindow from "../ChatBot/ChatWindow";
import { FaSave, FaEdit } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { io } from "socket.io-client";
import CollaboratorPanel from "./CollaboratorPanel";
import "./Blog.css";

export default function Blog() {
  const baseURL = axiosInstance.defaults.baseURL;
  const { id } = useParams();
  const navigate = useNavigate();
  const { CurrentUser: user, setCurrentUser } = UseUser();
  

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [editable, setEditable] = useState(false);
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [customRoomId, setCustomRoomId] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);
  const socketRef = useRef(null);
  const [showCollaboratorPanel, setShowCollaboratorPanel] = useState(false);

useEffect(() => {
  const socket = io(baseURL);
  socketRef.current = socket;

  socket.on("user-joined", (userSocketId) => {
    console.log(`Another user joined the room: ${userSocketId}`);
  });
  

  socket.on("receive-body", (updatedBody) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      body: updatedBody,
    }));
  });

  socket.on("room-ended", () => {
    toast.success("The collaboration session has ended.");
    setEditable(false);
    setShowCollaboratorPanel(false);
  });

  return () => socket.disconnect();
}, []);


  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axiosInstance.get(`/blog/${id}`);
        setBlog(res.data.blog);
        setComments(res.data.comments);

        const homeRes = await axiosInstance.get("/home");
        setCurrentUser(homeRes.data.user);
      } catch (err) {
        navigate("/");
        toast.error("Failed to fetch blog. Please try again.");
        console.error("Error fetching blog:", err);
      }
    }
    fetchBlog();
  }, [id]);

  const handleBlogUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("body", blog.body);
      formData.append("userId", user._id);
      if (newCoverImage) formData.append("coverImage", newCoverImage);

      const res = await axiosInstance.put(`/blog/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBlog(res.data.blog);
      setEditable(false);
      setNewCoverImage(null);
      toast.success("Blog updated successfully!");
    } catch (err) {
      toast.error("Failed to update blog.");
      console.error("Update error:", err);
    }
  };

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

  if (!blog) return <CircularIndeterminate className="loading-spinner" />;

  const isOwner =
    (user && blog.createdBy._id === user._id) || user?.role == "admin";

  return (
    <div className="blog-container">
      {/* Title */}
      <div className="edit-btn">
        {isOwner ? (
          <div className="edit-collab-buttons">
            <button
              className="collab-button"
              onClick={() => setShowCollaboratorPanel((prev) => !prev)}
            >
              <MdPersonAddAlt1 />
            </button>

            {showCollaboratorPanel && blog && (
              <CollaboratorPanel
                blogId={blog._id}
                socket={socketRef.current}
                user={user}
                blogCreatorId={blog.createdBy._id}
                customRoomId={customRoomId}
                setCustomRoomId={setCustomRoomId}
                currentRoom={currentRoom} 
                setCurrentRoom={setCurrentRoom}
                onEditableChange={setEditable}
                onClose={() => setShowCollaboratorPanel(false)}
              />
            )}

            <button
              onClick={() => {
                if (editable) handleBlogUpdate();
                setEditable((prev) => !prev);
              }}
              className="edit-button"
            >
              {editable ? <FaSave /> : <FaEdit />}
            </button>
          </div>
        ) : (
          <div className="edit-collab-buttons">
            <button
              className="collab-button"
              onClick={() => setShowCollaboratorPanel((prev) => !prev)}
            >
              <MdPersonAddAlt1 />
            </button>

            {showCollaboratorPanel && blog && (
              <CollaboratorPanel
                blogId={blog._id}
                socket={socketRef.current}
                user={user}
                blogCreatorId={blog.createdBy._id}
                customRoomId={customRoomId}
                setCustomRoomId={setCustomRoomId}
                currentRoom={currentRoom} 
                setCurrentRoom={setCurrentRoom}
                onEditableChange={setEditable}
                onClose={() => setShowCollaboratorPanel(false)}
              />
            )}
          </div>
        )}
      </div>

      <div className="blog-title-section">
        {editable ? (
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="blog-title-input"
          />
        ) : (
          <h1 className="blog-title">{blog.title}</h1>
        )}
      </div>

      {/* Cover Image */}
      <div className="blog-image-wrapper">
        <img
          src={
            newCoverImage ? URL.createObjectURL(newCoverImage) : blog.coverImage
            // Creates a temporary URL for previewing the uploaded image file in the browser
          }
          alt="Blog Cover"
          className="blog-cover-image"
        />
      </div>
      {editable && (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewCoverImage(e.target.files[0])}
          className="cover-image-input"
        />
      )}

      {/* Body */}
      <div className="blog-body-section">
        <textarea
          ref={(el) => {
            if (el) {
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }
          }}
          value={blog.body}
          readOnly={!editable}
          className="blog-body-textarea"
          onChange={(e) => {
            const newBody = e.target.value;
            setBlog((prev) => ({ ...prev, body: newBody }));

            const roomId = `${blog._id}`;
            if (socketRef.current && editable) {
              socketRef.current.emit("send-body", {
                roomId,
                body: newBody,
              });
            }

            const el = e.target;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          }}
          rows={1}
        />
      </div>

      {/* Author Info */}
      <div className="blog-author-wrapper">
        <img
          src={`${baseURL}${blog.createdBy.profileImage}`}
          alt="Author"
          className="blog-author-image"
          style={{ width: "50px", height: "50px" }}
        />
        <div className="blog-author-info">
        <span className="font-medium">Created By {blog.createdBy.name}</span>
        <hr />
        <span>Date: {new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Comments */}
      <div className="comment-section">
        {/* <h2 className="comment-heading">Comments Section</h2> */}
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

      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          display: "flex",
          justifySelf: "center",
          color: "black",
        }}
      >
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
      <footer className="copy-right">
        © 2025 Blogify. All rights reserved.
      </footer>

      {/* Chatbot */}
      <div>
        <ChatbotToggle onClick={() => setShowChatbot(!showChatbot)} />
        {showChatbot && (
          <ChatWindow blogId={id} onClick={() => setShowChatbot(false)} />
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseUser from "../UserContext/UserContext";
import "./AddBlog.css";
import axiosInstance from "../API/axiosInstance";
import CircularIndeterminate from "./CircularIndeterminate";

export default function AddBlog() {
  const { CurrentUser, setCurrentUser, setAllBlogs } = UseUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  

const handleGenerateBlog = async () => {
  setIsLoading(true);
  try {
    const res = await axiosInstance.post("/blog/generate", {
      title,
      body,
      userId: CurrentUser._id,
    });
    setBody(res.data.generatedBlog);
  } catch (error) {
    console.error("Error generating blog:", error);
  } finally {
    setIsLoading(false);
  }
};




  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    // console.log("from handleblog",CurrentUser)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", coverImage);
    formData.append("userId", CurrentUser._id);
    try {
      const res = await axiosInstance.post("/blog/addNewBlog", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setAllBlogs((prevBlogs) => {
        const alreadyExists = prevBlogs.some(
          (b) => b._id === res.data.blog._id
        );
        return alreadyExists ? prevBlogs : [...prevBlogs, res.data.blog];
      });

      toast.success("Blog created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create blog.");
      if (err.response) {
    console.error("Backend error response:", err.response.data);
    alert(err.response.data.error); 
  } else {
    console.error("Unknown error:", err.message);
    alert("Something went wrong");
  }
    }
  };

  return (
    <div className="create-blog-container">
      <form onSubmit={handleBlogSubmit} className="form-containe" encType="multipart/form-data">
        <div className="form-group">
          <label className="cover-label">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="form-group">
          <label>Body</label>
          <textarea
            className="blog-body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your blog content here..."
            rows={15}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {isLoading ? (
        <div className="Generate-Content-buffer">
          <CircularIndeterminate  />
        </div>
      ) : (
        <div className="Generate-Content">
          <button onClick={handleGenerateBlog} className="Generate-button">
            Generate Blog from AI
          </button>
        </div>
      )}
    </div>
  );
}

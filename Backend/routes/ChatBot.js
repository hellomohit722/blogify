const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const OpenAI = require("openai");
const ChatHistory = require("../models/chat");
const { restrictTo } = require("../middleware/auth");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//stream reply implementation can be done later

router.post("/", restrictTo(["user", "admin"]), async (req, res) => {
  const { blogId, message } = req.body;
  const user = req.user;

  if (!blogId || !message) {
    return res.status(400).json({ error: "blogId and message are required." });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    const context = `${blog.title}\n${blog.body}`;

    const response = await openai.chat.completions.create({
      // model: "gpt-4o",
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You help users understand blogs" },
        { role: "user", content: `Blog:\n${context}` },
        { role: "user", content: message },
      ],
    });


    const botReply =
      response.choices?.[0]?.message?.content ||
      "I'm not sure how to answer that.";

    const chatPair = [
      { role: "user", content: message },
      { role: "assistant", content: botReply },
    ];

    await ChatHistory.findOneAndUpdate(
      { userId: user._id, blogId },
      { $push: { messages: { $each: chatPair, $slice: -100 } } }
      // { new: true, upsert: true }
      // $each: Push both user message and assistant reply.
      // $slice: -100: Keep only the last 100 messages, to avoid unbounded growth.
    );

    res.json({ reply: botReply });
  } catch (err) {
    console.error("Chat failed:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get(
  "/history/:blogId",
  restrictTo(["user", "admin"]),
  async (req, res) => {
    try {
      const chat = await ChatHistory.findOne({
        userId: req.user._id,
        blogId: req.params.blogId,
      });
      res.json({ messages: chat?.messages || [] });
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      res.status(500).json({ error: "Failed to fetch chat history." });
    }
  }
);

module.exports = router;

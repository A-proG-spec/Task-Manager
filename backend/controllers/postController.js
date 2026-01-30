import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

//CREATE POST

export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const post = await Post.create({
    content,
    author: req.user._id,
  });
  res.status(201).json(post);
});

//GET ALL POST

export const getPublicPost = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name")
    .sort({ createdAt: -1 });
  res.json(posts);
});

//DELETE POST

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this post");
  }
  await Post.findByIdAndDelete(req.params.id);
  res.json({ messsage: "Post sucesfully deleted" });
});

export const UpdatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this post");
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedPost);
});

const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const Comment = require('../models/comment.js')
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({})
  if(comments){
    response.status(201).json(comments)
  }else{
    response.status(404).end()
  }
})

blogRouter.post("/", async (request, response, next) => {
  try {
    const user = request["user"];
    const { title, author, url, likes } = request.body;
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });
    const savedBlogs = await blog.save();
    const blognew = await savedBlogs.populate("user");
    user.blogs = [...user.blogs, blognew._id];
    await user.save();
    response.status(201).json(savedBlogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.post('/:id/comments', async (request, response, next)=> {
  try{
    const blog = await Blog.findById(request.params.id)
    const comment = new Comment({
      content: request.body.content,
      blog: blog._id
    })
    const savedComment = await comment.save()
    const commentNew = await savedComment.populate('blog') 
    blog.comments.push(commentNew)
    await blog.save()
    response.status(201).json(comment)
  }catch(error){
    next(error)
  }
})

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;
    const { title, author, url, likes } = request.body;

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "Only the creator can update blogs" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blog._id,
      { title, author, url, likes },
      { new: true },
    ).populate("user");
    response.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  const user = request["user"];

  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: "Only the creator can delete blogs" });
  }
  user.blogs = user.blogs.filter((e) => e.toString() === blog._id.toString());
  await blog.deleteOne();
  try {
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;

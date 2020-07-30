const Blog = require("../models/blog");
const blogRouter = require("express").Router();

// 4.8: Blog list tests, step1
blogRouter.get("/", async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });

  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });

  const result = await blog.save();

  response.status(201).json(result);
});

// 4.13 Blog list expansions, step1
blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const result = await Blog.findByIdAndRemove(id);

  response.status(204).json({ "deleted ntoe": result });
});

// 4.14 Blog list expansions, step2
blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const content = request.body;

  const updateBlog = {
    author: content.author,
    title: content.title,
    url: content.url,
    likes: content.likes,
  };

  const newBlog = await Blog.findOneAndUpdate(id, updateBlog, { new: true });
  response.json(newBlog);
});

module.exports = blogRouter;

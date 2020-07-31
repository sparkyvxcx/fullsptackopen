const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

// 4.8: Blog list tests, step1
// 4.17: bloglist expansion, step5
// listing all blogs so that the creator's user information is displayed with the blog
blogRouter.get("/", async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });

  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  // const newBlogs = [];

  // const promiseArray = blogs.map(async (blog) => {
  //   const newBlog = blog.toJSON();
  //   const uid = blog.user;
  //   if (uid) {
  //     const user = await User.findById(uid);
  //     console.log(user.toJSON());
  //     newBlog.user = { username: user.username, name: user.name, id: user.id };
  //   }
  //   newBlogs.push(newBlog);
  //   return blog;
  // });
  // await Promise.all(promiseArray);

  // response.json(newBlogs);

  response.json(blogs);
});

// 4.17: bloglist expansion, step5
blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = {
    ...body,
    user: user._id,
  };

  const blog = new Blog(newBlog);

  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog);
  await user.save();

  response.json(savedBlog);
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

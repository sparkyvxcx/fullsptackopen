const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

// 4.17: bloglist expansion, step5
// ad-hoc solution to displays the blogs created by each user
userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  const newUsers = [];

  const promiseArray = users.map(async (user) => {
    const newUser = user.toJSON();
    // console.log(newUser);
    const bids = user.blogs;
    const blogs = [];
    if (bids.length !== 0) {
      const bidArray = bids.map(async (bid) => {
        const blog = await Blog.findById(bid);
        // console.log(blog);
        blogs.push({
          id: blog.id,
          author: blog.author,
          title: blog.title,
          url: blog.url,
        });
        return bid;
      });
      await Promise.all(bidArray);
    }
    newUser.blogs = blogs;
    console.log(newUser);
    newUsers.push(newUser);
    return user;
  });
  await Promise.all(promiseArray);

  // response.json(users);
  response.json(newUsers);
});

userRouter.post("/", async (request, response) => {
  const body = request.body;

  const password = body.password;

  if (!password) {
    return response.status(401).json({ error: "password required!" });
  } else if (password.length < 3) {
    return response.status(401).json({ error: "password too short!" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = userRouter;

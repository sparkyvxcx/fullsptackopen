const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

jest.setTimeout(100000);

const initialData = helper.listWithOneBlog;

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("Database cleared!");

  await User.deleteMany({});

  const blogObjects = initialData.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  console.log("Database loaded!");
});

describe("backend api test", () => {
  test("blogs are returned with exactly quantity", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialData.length);
  });

  test("check unique identifier property", async () => {
    const response = await api.get("/api/blogs");

    const testBlogs = response.body;

    expect(testBlogs[0].id).toBeDefined();
  });
});

describe("one blog data", () => {
  // 4.10: Blog list tests, step3
  test("a valid blog can be added so do comments", async () => {
    const newBlog = {
      title: "Clear explanation of Rust’s module system",
      author: "Sheshbabu Chinnakonda",
      url: "http://www.sheshbabu.com/posts/rust-module-system/",
      likes: 4537,
    };

    console.log("Spawn token");

    const newUser = {
      username: "elliot",
      name: "Elliot Alderson",
      password: "fsocity",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    let response = await api
      .post("/api/login")
      .send({
        username: "elliot",
        password: "fsocity",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const userLogin = response.body;

    const TEST_TOKEN = userLogin.token;

    response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${TEST_TOKEN}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newlyCreateBlog = response.body;

    response = await api.get("/api/blogs");
    const testBlogs = response.body;

    expect(testBlogs).toHaveLength(initialData.length + 1);

    const titles = testBlogs.map((blog) => blog.title);

    expect(titles).toContain("Clear explanation of Rust’s module system");

    const id = newlyCreateBlog.id;
    const comment = {
      content: "Hello world, a test comment",
    };

    response = await api
      .post(`/api/blogs/${id}/comments`)
      .send(comment)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = response.body;

    const commentsFromBlog = updatedBlog.comments;

    expect(commentsFromBlog).toHaveLength(1);
    expect(commentsFromBlog[0].content).toContain(
      "Hello world, a test comment"
    );
  });
});

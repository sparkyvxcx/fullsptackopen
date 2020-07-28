const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

jest.setTimeout(100000);

const initialData = helper.listWithBiggerBlog;

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("Database cleared!");

  const blogObjects = initialData.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  console.log("Database loaded!");
});

describe("backend api test", () => {
  // 4.8: Blog list tests, step1
  test("all blogs are returned with exactly quantity", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialData.length);
  });

  // 4.9*: Blog list tests, step2
  test("check unique identifier property", async () => {
    const response = await api.get("/api/blogs");

    const testBlogs = response.body;

    expect(testBlogs[0].id).toBeDefined();
  });
});

describe("manipulate blog data", () => {
  // 4.10: Blog list tests, step3
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Clear explanation of Rust’s module system",
      author: "Sheshbabu Chinnakonda",
      url: "http://www.sheshbabu.com/posts/rust-module-system/",
      likes: 4537,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const testBlogs = response.body;

    expect(testBlogs).toHaveLength(initialData.length + 1);

    const titles = testBlogs.map((blog) => blog.title);

    expect(titles).toContain("Clear explanation of Rust’s module system");
  });

  // 4.13 Blog list expansions, step1
  test("a valid blog can be deleted", async () => {
    let response = await api.get("/api/blogs");
    const testBlogs = response.body;

    const targetBlog = testBlogs[0];

    await api.delete(`/api/blogs/${targetBlog.id}`).expect(204);

    response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(testBlogs.length - 1);
  });

  // 4.14 Blog list expansions, step2
  test("a valid blog can be updated", async () => {
    let response = await api.get("/api/blogs");
    const testBlogs = response.body;

    const targetBlog = testBlogs[0];

    targetBlog.author = "John Snow";
    targetBlog.likes = 7;
    targetBlog.title = "Battle of Winterfell";

    response = await api
      .put(`/api/blogs/${targetBlog.id}`)
      .send(targetBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = response.body;
    expect(updatedBlog.title).toBe("Battle of Winterfell");
    expect(updatedBlog.author).toBe("John Snow");
    expect(updatedBlog.likes).toBe(7);
  });
});

describe("missing property of a blog check", () => {
  // 4.11*: Blog list tests, step4
  test("missing likes property to be zero", async () => {
    const newBlog = {
      title: "Clear explanation of Rust’s module system",
      author: "Sheshbabu Chinnakonda",
      url: "http://www.sheshbabu.com/posts/rust-module-system/",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdBlog = response.body;

    expect(createdBlog.likes).toBe(0);
  });

  // 4.12*: Blog list tests, step5
  test("missing title and url property", async () => {
    const newBlog = {
      author: "Sheshbabu Chinnakonda",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

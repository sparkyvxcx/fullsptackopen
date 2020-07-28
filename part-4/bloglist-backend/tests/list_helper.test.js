const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

test("dummy return one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(helper.listWithBiggerBlog);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of empty list is {}", () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test("of a bigger list is filtered right", () => {
    const result = listHelper.favoriteBlog(helper.listWithBiggerBlog);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  test("of empty list is {}", () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test("of a bigger list is accumalate right", () => {
    const result = listHelper.mostBlogs(helper.listWithBiggerBlog);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("of empty list is {}", () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test("of a bigger list is accumalate right", () => {
    const result = listHelper.mostLikes(helper.listWithBiggerBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

describe("most blogs with lodash library", () => {
  test("of empty list is {}", () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test("of a bigger list is accumalate right", () => {
    const result = listHelper.mostBlogs(helper.listWithBiggerBlog);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes with lodash library", () => {
  test("of empty list is {}", () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test("of a bigger list is accumalate right", () => {
    const result = listHelper.mostLikes(helper.listWithBiggerBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Blog title render test",
    author: "Tester",
    url: "https://www.google.com",
    likes: 0,
  };

  let component;

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test("renders title && author, while hide detail", () => {
    const div = component.container.querySelector(".blogTitleAuthor");

    // component.debug();

    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);

    const detail = component.container.querySelector(".detailContent");
    expect(detail).toHaveStyle("display: none");
  });

  test("url and number of likes are shown when the shown details button has been clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const detail = component.container.querySelector(".detailContent");
    expect(detail).toBeDefined();
    expect(detail).not.toHaveStyle("display: none");

    expect(detail).toHaveTextContent("https://www.google.com");
    expect(detail).toHaveTextContent("likes 0");
  });

  test("like button is clicked twice, the event handler the component received as props is called twice", () => {
    const likeBlog = jest.fn();

    component = render(<Blog blog={blog} updateBlog={likeBlog} />);

    const button = component.container.querySelector(".likeButton");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});

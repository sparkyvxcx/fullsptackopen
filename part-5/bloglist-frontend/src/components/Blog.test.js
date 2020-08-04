import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders title && author, while hide detail", () => {
  const blog = {
    title: "Blog title render test",
    author: "Tester",
  };

  const component = render(<Blog blog={blog} />);

  const div = component.container.querySelector(".blogTitleAuthor");

  // component.debug();

  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);

  const detail = component.container.querySelector(".detailContent");
  expect(detail).toHaveStyle("display: none");
});

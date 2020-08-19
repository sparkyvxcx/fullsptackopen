import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates input fields and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Details about 5-9 attack" },
  });
  fireEvent.change(author, {
    target: { value: "Elliot" },
  });
  fireEvent.change(url, {
    target: { value: "https://e-corp.org" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Details about 5-9 attack",
    author: "Elliot",
    url: "https://e-corp.org",
  });
});

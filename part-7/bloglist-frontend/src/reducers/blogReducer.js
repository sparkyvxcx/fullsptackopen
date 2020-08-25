import blogService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOG":
      return action.data;
    case "CREATE_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG":
      const updatedBlog = action.data;
      const uid = updatedBlog.id;
      return state.map((blog) => (blog.id === uid ? updatedBlog : blog));
    case "REMOVE_BLOG":
      const rid = action.data;
      return state.filter((blog) => blog.id !== rid);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    // fetch an array containing blog
    const data = await blogService.fetchAll();
    dispatch({ type: "INIT_BLOG", data });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const data = await blogService.create(newBlog);
    dispatch({ type: "CREATE_BLOG", data });
  };
};

export const updateBlog = (newBlog) => {
  return async (dispatch) => {
    const data = await blogService.update(newBlog);
    dispatch({ type: "UPDATE_BLOG", data });
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    const response = await blogService.remove(blogId);
    console.log(response);
    if (response.status === 204) {
      dispatch({ type: "REMOVE_BLOG", data: blogId });
    } else {
      dispatch({ type: "failed" });
    }
  };
};

export const addBlogComment = (blogId, comment) => {
  return async (dispatch) => {
    const response = await blogService.addComment(blogId, comment);
    if (response.status === 200) {
      dispatch({ type: "UPDATE_BLOG", data: response.data });
    }
  };
};

export default reducer;

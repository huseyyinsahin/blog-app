import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import {
  blogData,
  fail,
  start,
  categories,
  blogDetail,
  userBlogs,
  blogComments,
} from "../features/blogSlice";
import useAxios from "./useAxios";

function useBlogRequest() {
  const dispatch = useDispatch();
  const { axiosToken } = useAxios();

  const getBlogs = async (pageCount = "1", category = "", search = "") => {
    const filter = `blogs/?page=${pageCount}&limit=5&filter[categoryId]=${category}&search[title]=${search}`;

    const all = `blogs/?page=${pageCount}&limit=5&search[title]=${search}`;

    dispatch(start());
    try {
      const { data } = await axiosToken(category ? filter : all);
      dispatch(blogData(data));
    } catch (error) {
      dispatch(fail());
    }
  };

  const getCategories = async () => {
    dispatch(start());
    try {
      const { data } = await axiosToken("categories/");
      dispatch(categories(data));
    } catch (error) {
      dispatch(fail());
    }
  };

  const likeBlog = async (id, pageCount, category, search) => {
    try {
      await axiosToken.post(`blogs/${id}/postLike`);
      getBlogs(pageCount, category, search);
      getBlogDetail(id);
    } catch (error) {
      toastErrorNotify("The like operation failed!");
    }
  };

  const getBlogDetail = async (id) => {
    dispatch(start());
    try {
      const { data } = await axiosToken(`blogs/${id}`);
      dispatch(blogDetail(data));
    } catch (error) {
      dispatch(fail());
    }
  };

  const commentBlog = async (comment) => {
    try {
      const { data } = await axiosToken.post(`comments`, comment);
      toastSuccessNotify("Comment added");
      dispatch(blogComments(data));
    } catch (error) {
      toastErrorNotify("Unable to add comment!");
    }
  };

  const deleteCommentBlog = async (id, blogId) => {
    try {
      await axiosToken.delete(`comments/${id}`);
      toastSuccessNotify("Comment deleted");
      getBlogDetail(blogId);
    } catch (error) {
      toastErrorNotify("Deleting comment failed!");
    }
  };

  const postNewBlog = async (newBlogData) => {
    try {
      await axiosToken.post(`blogs`, newBlogData);
      toastSuccessNotify("Blog added");
    } catch (error) {
      toastErrorNotify("Unable to add Blog!");
    }
  };

  const getUserBlogs = async (id) => {
    dispatch(start());
    try {
      const { data } = await axiosToken(`blogs?author=${id}`);
      dispatch(userBlogs(data));
      getCategories();
    } catch (error) {
      dispatch(fail());
    }
  };

  const deleteUserBlogs = async (id, userId) => {
    try {
      await axiosToken.delete(`blogs/${id}`);
      toastSuccessNotify("Blog successfully deleted");
      getUserBlogs(userId);
    } catch (error) {
      toastErrorNotify("Blog could not be deleted!");
    }
  };

  const updateUserBlogs = async (id, userId, updateBlog) => {
    try {
      await axiosToken.put(`blogs/${id}`, updateBlog);
      toastSuccessNotify("Blog successfully updated.");
      getUserBlogs(userId);
    } catch (error) {
      toastErrorNotify("Blog update failed!");
    }
  };

  return {
    getBlogs,
    getCategories,
    likeBlog,
    getBlogDetail,
    commentBlog,
    postNewBlog,
    getUserBlogs,
    deleteUserBlogs,
    updateUserBlogs,
    deleteCommentBlog,
  };
}

export default useBlogRequest;

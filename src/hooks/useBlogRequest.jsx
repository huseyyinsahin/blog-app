import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch, useSelector } from "react-redux";
import {
  blogData,
  fail,
  start,
  categories,
  blogDetail,
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
      console.log(data);
    } catch (error) {
      dispatch(fail());
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axiosToken("categories/");
      dispatch(categories(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const likeBlog = async (id, pageCount, category, search) => {
    dispatch(start());
    try {
      const { data } = await axiosToken.post(`blogs/${id}/postLike`);
      getBlogs(pageCount, category, search);
      console.log(data);
    } catch (error) {
      dispatch(fail());
    }
  };

  const getBlogDetail = async (id) => {
    dispatch(start());
    try {
      const { data } = await axiosToken.post(`blogs/${id}`);
      dispatch(blogDetail(data));
      console.log(data);
    } catch (error) {
      dispatch(fail());
    }
  };

  return { getBlogs, getCategories, likeBlog, getBlogDetail };
}

export default useBlogRequest;

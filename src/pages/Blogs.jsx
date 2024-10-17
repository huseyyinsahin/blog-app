import React, { useEffect, useState } from "react";
import useBlogRequest from "../hooks/useBlogRequest";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import BlogCards from "../components/BlogCards";
import Categories from "../components/Categories";
import Search from "../components/Search";

function Blogs() {
  const { getBlogs, getCategories } = useBlogRequest();
  const { blogsData, pages, categories, loading, error } = useSelector(
    (state) => state.blog
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [categoryChange, setCategoryChange] = useState(false);
  const handleCategoryChange = () => setCategoryChange(!categoryChange);

  useEffect(() => {
    getBlogs();
    getCategories();
  }, []);

  useEffect(() => {
    setSearch("");
    getBlogs(1, selectedCategory, search);
    setPage(1);
  }, [selectedCategory, categoryChange]);

  useEffect(() => {
    getBlogs(1, selectedCategory, search);
    setPage(1);
  }, [search]);

  const handlePage = (e, val) => {
    getBlogs(val, selectedCategory, search);
    setPage(val);
  };

  const handleReload = () => {
    getBlogs();
    getCategories();
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          An error occurred while loading the site. Please try refreshing the
          page!
        </Alert>
      )}

      <Categories
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <Search setSearch={setSearch} search={search} />

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={150} />
        </div>
      ) : blogsData.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "70vh",
            }}
          >
            {blogsData.map((blog) => (
              <BlogCards
                key={blog._id}
                blog={blog}
                page={page}
                selectedCategory={selectedCategory}
                search={search}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <Pagination
              onChange={handlePage}
              page={page}
              count={pages.total}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "60vh",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: "3rem" }}
          >
            The blog you are looking for was not found.
          </Typography>
          <Button onClick={handleReload} variant="contained">
            Reload the page
          </Button>
        </Box>
      )}
    </>
  );
}

export default Blogs;

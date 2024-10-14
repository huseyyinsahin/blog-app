import React, { useEffect, useState } from "react";
import useBlogRequest from "../hooks/useBlogRequest";
import {
  Box,
  Button,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BlogCards from "../components/BlogCards";

function Blogs() {
  const { getBlogs, getCategories } = useBlogRequest();
  const { data, pages, categories } = useSelector((state) => state.blog);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBlogs();
    getCategories();
  }, []);

  useEffect(() => {
    getBlogs(1, selectedCategory);
  }, [selectedCategory]);

  const handleSearch = () => {
    if (search.trim()) {
      getBlogs(1, selectedCategory, search);
      setSearch("");
    }
  };

  const handlePage = (e, val) => {
    getBlogs(val, selectedCategory, search);
  };
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0 2rem 0",
          flexWrap: "wrap",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "center", flexWrap: "wrap" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "0.5rem 1.5rem",
            }}
            onClick={() => setSelectedCategory("")}
          >
            All Blogs
          </Button>
          {categories.map(({ name, _id }) => (
            <Button
              key={_id}
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "20px",
                padding: "0.5rem 1.5rem",
              }}
              onClick={() => setSelectedCategory(_id)}
            >
              {name}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "80%", sm: "300px" },
            marginBottom: { xs: "1rem", sm: "0" },
          }}
        >
          <TextField
            label="Search"
            size="small"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px 0 0 20px",
              },
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              borderRadius: "0 20px 20px 0",
              padding: "0.5rem 1rem",
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
      {data.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight:"70vh"
            }}
          >
            {data
              .filter((blog) => blog.isPublish === true)
              .map((blog) => (
                <BlogCards blog={blog} />
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

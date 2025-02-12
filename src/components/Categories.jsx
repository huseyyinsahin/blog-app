import { Box, Button, Grid2 } from "@mui/material";
import React from "react";

function Categories({ categories, setSelectedCategory, handleCategoryChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "2rem 0",
        width: "100%",
      }}
    >
      <Grid2 container spacing={1} justifyContent="center">
        <Grid2 size={{ xs: 2, sm: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "0.5rem 1.5rem",
              width: "100%",
            }}
            onClick={() => {
              setSelectedCategory("");
              handleCategoryChange();
            }}
          >
            All Blogs
          </Button>
        </Grid2>

        {categories.map(({ name, _id }) => (
          <Grid2 size={{ xs: 2, sm: "auto" }} key={_id}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "20px",
                padding: "0.5rem 1.5rem",
                width: "100%",
              }}
              onClick={() => {
                setSelectedCategory(_id);
                handleCategoryChange();
              }}
            >
              {name}
            </Button>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default Categories;

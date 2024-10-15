import { Box, Button, Stack } from "@mui/material";
import React from "react";

function Categories({ categories, setSelectedCategory }) {
  return (
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
  );
}

export default Categories;

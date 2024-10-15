import { Box, TextField } from "@mui/material";
import React from "react";

function Search({ setSearch, search }) {
  return (
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
              borderRadius: "20px",
            },
            "& .MuiInputBase-input": {
              padding: "10px",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Search;

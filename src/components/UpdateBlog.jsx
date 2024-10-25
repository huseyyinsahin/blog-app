import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { object, string } from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { Form } from "formik";
import { useSelector } from "react-redux";
import useBlogRequest from "../hooks/useBlogRequest";

function UpdateBlog({ openUpdate, handleUpdateClose, myBlog }) {
  const { categories } = useSelector((state) => state.blog);
  const { updateUserBlogs } = useBlogRequest();

  const putBlogSchema = object({
    title: string()
      .required("Title is required")
      .min(10, "You must enter at least 10 characters"),
    content: string()
      .required("Content is required")
      .min(300, "You must enter at least 300 characters"),
    image: string()
      .required("Image is required")
      .url("Please enter a valid URL"),
    categoryId: string().required("Category is required"),
    isPublish: string().required("Status is required"),
  });

  return (
    <Box>
      <Dialog
        open={openUpdate}
        onClose={() => handleUpdateClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Formik
            initialValues={{
              _id: myBlog._id,
              userId: myBlog.userId,
              title: myBlog.title,
              content: myBlog.content,
              image: myBlog.image,
              categoryId: myBlog.categoryId,
              isPublish: myBlog.isPublish,
            }}
            validationSchema={putBlogSchema}
            onSubmit={(values, actions) => {
              updateUserBlogs(myBlog._id, myBlog.userId, values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <Form>
                <Box
                  sx={{
                    width: {
                      xs: "280px",
                      sm: "450px",
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: "center",
                      color: "#0288D1",
                      fontWeight: "bold",
                    }}
                  >
                    UPDATE BLOG
                  </Typography>
                  <TextField
                    name="title"
                    label="Title"
                    variant="standard"
                    type="text"
                    onChange={handleChange}
                    value={values.title}
                    error={touched.title && Boolean(errors.title)}
                    onBlur={handleBlur}
                    helperText={errors.title}
                  />
                  <TextField
                    sx={{ marginTop: "-10px", marginBottom: "4px" }}
                    name="image"
                    label="Image"
                    variant="standard"
                    type="text"
                    onChange={handleChange}
                    value={values.image}
                    error={touched.image && Boolean(errors.image)}
                    onBlur={handleBlur}
                    helperText={errors.image}
                  />

                  <FormControl
                    fullWidth
                    error={touched.categoryId && Boolean(errors.categoryId)}
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="categoryId"
                      label="Category"
                      type="text"
                      onChange={handleChange}
                      value={values.categoryId}
                      onBlur={handleBlur}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.categoryId}</FormHelperText>
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={touched.isPublish && Boolean(errors.isPublish)}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="isPublish"
                      label="Status"
                      type="text"
                      onChange={handleChange}
                      value={values.isPublish}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={false}>Draft</MenuItem>
                      <MenuItem value={true}>Published</MenuItem>
                    </Select>
                    <FormHelperText>{errors.isPublish}</FormHelperText>
                  </FormControl>

                  <TextField
                    name="content"
                    label="Content"
                    variant="outlined"
                    type="text"
                    rows={4}
                    multiline
                    onChange={handleChange}
                    value={values.content}
                    error={touched.content && Boolean(errors.content)}
                    onBlur={handleBlur}
                    helperText={errors.content}
                  />
                  <Typography
                    sx={{ textAlign: "center", color: "#0288d1", mt: 1 }}
                  ></Typography>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    UPDATE BLOG
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default UpdateBlog;

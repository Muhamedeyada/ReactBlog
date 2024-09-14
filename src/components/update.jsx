import React from "react";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Stack from "@mui/material/Stack";
import { Modal, Typography, Input, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateComponent({ postId }) {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState({
    title: "",
    image: "",
    description: "",
  });

  const handleOpen = () => {
    getPost(postId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPost = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      const fetchedPost = response.data;

      setPost({
        title: fetchedPost.title,
        image: fetchedPost.image,
        description: fetchedPost.description,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3000/posts/${postId}`, post);
      toast.success("Post updated successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to update post. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative bottom-4">
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditNoteIcon />}
            onClick={handleOpen}
            className="bg-purple-600 text-white hover:bg-purple-700 border-none"
          >
            Edit
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            component="form"
            onSubmit={handleUpdate}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg w-full max-w-md"
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              className="text-xl font-semibold mb-4"
            >
              ✨ Edit Your Blog ✨
            </Typography>
            <Typography
              id="modal-description"
              variant="body1"
              className="mb-2 font-medium"
            >
              Blog Info
            </Typography>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Blog Title
              </label>
              <Input
                type="text"
                placeholder="Title"
                name="title"
                value={post.title}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                endAdornment={
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faPen} className="text-gray-400" />
                  </InputAdornment>
                }
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Blog Image
              </label>
              <Input
                type="text"
                placeholder="Image URL"
                name="image"
                value={post.image}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                endAdornment={
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faImage} className="text-gray-400" />
                  </InputAdornment>
                }
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Input
                type="text"
                placeholder="Description"
                name="description"
                value={post.description}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                endAdornment={
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faInfo} className="text-gray-400" />
                  </InputAdornment>
                }
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2"
            >
              Save Changes 🚀
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}

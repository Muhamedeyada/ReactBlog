import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function DeleteComponent({ postId, onDelete }) {
  const deletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      onDelete(postId);
      toast.success("Story deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete story");
    }
  };

  return (
    <button
      onClick={deletePost}
      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
      title="Delete Story"
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
}

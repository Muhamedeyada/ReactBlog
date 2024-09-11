import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const POST_CATEGORIES = [
  "Agriculture",
  "Business",
  "Education",
  "Entertainment",
  "Art",
  "Investment",
  "Uncategorized",
  "Weather",
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function EditPost({ posts }) {
  const [title, setTitle] = useState(posts.title || "");
  const [category, setCategory] = useState(posts.category || "Uncategorized");
  const [content, setcontent] = useState(posts.content || "");
  const [images, setImages] = useState(posts.images || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(posts.title);
    setCategory(posts.category);
    setcontent(posts.content);
    setImages(posts.images);
  }, [posts]);

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!content) newErrors.content = "content is required";
    if (!images) newErrors.images = "Images are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
    }
  };

  return (
    <section className="edit-post p-4 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Post</h2>
        {Object.keys(errors).length > 0 && (
          <div className="form_error-message text-red-500 mb-4">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form className="form edit-post_form space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered w-full"
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={content}
            onChange={setcontent}
            className="bg-white"
          />
          <input
            type="file"
            onChange={(e) => setImages(e.target.files[0])}
            accept="image/png, image/jpg, image/jpeg"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Update
          </button>
        </form>
      </div>
    </section>
  );
}

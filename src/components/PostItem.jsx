import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

export default function PostItem({
  postId,
  title,
  content,
  image,
  authorId,
  category,
}) {
  const shortContent =
    content.length > 145 ? content.substr(0, 145) + "....." : content;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}

      {/* Post Content */}
      <div className="p-4">
        <Link
          to={`/posts/${postId}`}
          className="text-xl font-semibold text-gray-900 hover:text-blue-600"
        >
          {title}
        </Link>
        <p className="mt-2 text-gray-600">{shortContent}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <PostAuthor authorId={authorId} />
          <Link
            to={`/posts/categories/${category}`}
            className="text-blue-600 hover:underline"
          >
            {category}
          </Link>
        </div>
      </div>
    </div>
  );
}

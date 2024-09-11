import { useState } from "react";
import { DUMMY_POSTS } from "../data";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className="dashboard p-4">
      {posts.length ? (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="dashboard_post bg-white p-4 rounded-lg shadow-md"
            >
              <div className="dashboard_post-info">
                <div className=" mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                <h5 className="text-lg font-semibold">{post.title}</h5>
              </div>
              <div className="dashboard_post-actions mt-4 flex justify-between">
                <Link
                  to={`/posts/${post.id}`}
                  className="btn btn-sm btn-primary"
                >
                  View
                </Link>
                <Link
                  to={`/posts/${post.id}/edit`}
                  className="btn btn-sm btn-secondary"
                >
                  Edit
                </Link>
                <Link
                  to={`/posts/${post.id}/delete`}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl">You don't have any posts</h2>
      )}
    </section>
  );
}

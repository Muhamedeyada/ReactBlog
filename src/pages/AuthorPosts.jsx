import { useState } from "react";
import PostItem from "../components/PostItem";
import { DUMMY_POSTS } from "../data";

export default function AuthorPosts() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="bg-gray-50 py-8">
      {posts.length > 0 ? (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(({ id, title, content, image, authorId, category }) => (
              <PostItem
                key={id}
                postId={id}
                title={title}
                content={content}
                image={image}
                authorId={authorId}
                category={category}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2 className="justify-center bg-black text-red-900  font-bold text-center text-5xl">
          {" "}
          NO POSTS FOUND{" "}
        </h2>
      )}
    </section>
  );
}

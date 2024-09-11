import { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/3.jpg";
import img2 from "../images/4.jpg";
import img3 from "../images/5.jpg";
import img4 from "../images/6.jpg";

export default function Authors() {
  const authorsData = [
    { id: "1", name: "Jo Yo", image: img1, posts: 3 },
    { id: "2", name: "Kim Yoon", image: img2, posts: 5 },
    { id: "3", name: "Yuna", image: img3, posts: 2 },
    { id: "4", name: "Minyoung", image: img4, posts: 4 },
  ];
  const [authors, setAuthors] = useState(authorsData);

  return (
    <section className="authors p-4">
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {authors.map(({ id, name, image, posts }) => (
            <Link
              key={id}
              to={`/posts/users/${id}`}
              className="block p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="author text-center">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h2 className="mt-2 text-xl font-semibold">{name}</h2>
                <p className="text-gray-600">Number of posts: {posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl">No user</h2>
      )}
    </section>
  );
}

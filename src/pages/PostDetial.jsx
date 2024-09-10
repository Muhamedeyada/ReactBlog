import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import img3 from "../images/5.jpg";

export default function PostDetial() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with Author and Action Buttons */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <PostAuthor />
          <div className="mt-4 lg:mt-0 flex space-x-4">
            <Link
              to={`/posts/wqewq/edit`}
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
            >
              Edit
            </Link>
            <Link
              to={`/posts/wqewq/delete`}
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
            >
              Delete
            </Link>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          This is the Post Title
        </h1>

        {/* Post Image */}
        <div className="mb-6 flex justify-center">
          <img
            src={img3}
            alt="Post"
            className="w-full max-w-3xl h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Post Content */}
        <div className="prose lg:prose-lg mx-auto">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            debitis, maxime tempora, dolorem sint obcaecati voluptatibus eaque
            expedita id nemo laborum doloremque repellendus dignissimos ex
            veniam exercitationem incidunt mollitia facilis! In nesciunt ratione
            explicabo illum soluta earum nemo quibusdam pariatur ipsa dolore
            nobis hic, odit voluptatem accusantium. Debitis, libero quis.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
            impedit dolore modi aspernatur ipsa nemo, enim cupiditate unde rem
            esse aut officiis harum ipsam quae minima iste obcaecati fuga illo.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            debitis, maxime tempora, dolorem sint obcaecati voluptatibus eaque
            expedita id nemo laborum doloremque repellendus dignissimos ex
            veniam exercitationem incidunt mollitia facilis! In nesciunt ratione
            explicabo illum soluta earum nemo quibusdam pariatur ipsa dolore
            nobis hic, odit voluptatem accusantium. Debitis, libero quis.
          </p>
        </div>
      </div>
    </section>
  );
}

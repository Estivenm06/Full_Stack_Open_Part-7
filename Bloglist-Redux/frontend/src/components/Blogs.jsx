import Proptypes from "prop-types";
import { Link } from "react-router-dom";
const Blogs = ({ blog, id }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div
      key={id}
      style={blogStyle}
      data-testid="blogs"
      className="blog-container"
    >
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

Blogs.Proptypes = {
  handleLikes: Proptypes.func.isRequired,
};

export default Blogs;

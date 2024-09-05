import { useState } from "react";
import { del } from "../services/blogs";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const TogglableBlogs = ({
  title,
  author,
  likes,
  url,
  blogStyle,
  handleLikes,
  buttonLabel,
  user,
  id,
  blogs,
}) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const shownWhenVisible = { display: visible ? "" : "none" };
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: del,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const deleteBlog = (id) => {
    deleteMutation.mutate(id);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handle = async () => {
    try {
      const blogIndex = blogs.find((n) => n.id === id);
      if (blogIndex.user[0].id === user.id) {
        if (
          window.confirm(
            `Remove blog ${blogIndex.title} by ${blogIndex.author}`,
          )
        ) {
          deleteBlog(blogIndex.id);
        }
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const canDelete = () => {
    const blogIndex = blogs.find((n) => n.id === id);
    if ((blogIndex, user)) {
      return blogIndex.user[0].id === user.id;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle} data-testid="blogs" className="blog-container">
          {title}
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
      </div>
      <div style={shownWhenVisible}>
        <div style={blogStyle} className="blog">
          {title}
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {url}
          <br />
          <div data-testid="likes" className="likes">
            {likes}
            <button onClick={handleLikes}>like</button>
            <br />
          </div>
          {author}
          <br />
          <div>
            <button
              onClick={handle}
              data-testid="deletebutton"
              className={canDelete() ? "" : "hidden"}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TogglableBlogs;

import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { voteAblog } from "../../reducers/bloglistReducer";
import { useEffect, useState } from "react";
import { getComments, commentABlog } from "../../reducers/commentsReducer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
export const Blog = () => {
  const [comment, setComment] = useState("");
  const blogs = useSelector((state) => state.blogslist);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((n) => String(n.id) === id);

  useEffect(() => {
    dispatch(getComments(id));
  }, []);

  if (!blog) {
    return null;
  }

  const content = comments.map((comment) => comment?.content);

  const handleLikes = (id) => {
    const blogIndex = blogs.find((n) => n.id === id);
    dispatch(voteAblog(id, blogIndex));
  };

  const handleComment = () => {
    try {
      dispatch(commentABlog({ id: id, content: comment }));
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>{blog.title}</h1>
      <Link to={`/${blog.url}`}>{blog.url}</Link>
      <div>
        <p>
          {blog.likes} likes{" "}
          <button onClick={() => handleLikes(blog.id)}>like</button>
        </p>
      </div>
      added by {blog.author}
      <div>
        <h2>comments</h2>
        <form onSubmit={handleComment}>
        <TextField label='filled' type="text" data-testid='comment' value={comment} name="Comment" onChange={(event) => setComment(event.target.value)}/>
        <Button variant="contained" type="submit">Send</Button>
        </form>
        {content ? (
          <ul>
            {content.map((element, id) => (
              <li key={id}>{element}</li>
            ))}
          </ul>
        ) : (
          <p>loading comments...</p>
        )}
      </div>
    </div>
  );
};

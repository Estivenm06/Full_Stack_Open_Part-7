import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        title
        <TextField
          data-testid="title"
          type="text"
          value={title}
          name="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        author
        <TextField
          data-testid="author"
          type="text"
          value={author}
          name="Author"
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <TextField
          data-testid="url"
          type="text"
          value={url}
          name="Url"
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <Button variant="contained" type="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateForm;

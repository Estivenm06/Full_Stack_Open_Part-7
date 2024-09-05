import { initializeUsers } from "../../reducers/usersReducer";
import { initializeBlogs } from "../../reducers/bloglistReducer";
import { checkIflogged } from "../../reducers/loginReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const User = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogslist);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    try {
      dispatch(checkIflogged());
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map((element) => (
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{element.name}</td>
                <strong>
                  <td>{element.blogs.length}</td>
                </strong>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

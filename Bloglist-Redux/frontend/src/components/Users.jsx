import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";

export const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      {users.map((element, id) => (
        <div key={id}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Blogs created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link to={`/users/${element.id}`}>{element.name}</Link>
                  </TableCell>
                  <TableCell>
                    <strong>{element.blogs.length}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export const User = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((n) => String(n.id) === id);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((element, id) => (
          <li key={id}>{element.title}</li>
        ))}
      </ul>
    </div>
  );
};

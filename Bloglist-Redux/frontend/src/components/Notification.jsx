import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification);
  if (notification === null) {
    return null;
  }
  return (
    <div>
      <Alert severity={notification.type}>{notification.payload}</Alert>
    </div>
  );
};

export default Notification;

import { createNotification } from "../reducers/notificationReducer";
import { useContext } from "react";
const Notification = () => {
  const [notification, dispatch] = useContext(createNotification);
  if (notification === null) {
    return null;
  }
  const { message, className } = notification;
  return <div className={className}>{message}</div>;
};

export default Notification;

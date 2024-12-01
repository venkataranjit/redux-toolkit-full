import { useSelector } from "react-redux";

const ErrorMsg = () => {
  const studentState = useSelector((state) => state.student);
  const userState = useSelector((state) => state.user);

  return (
    <div className="alert alert-danger">
      {studentState.error && studentState.error}{" "}
      {userState.error && userState.error}
    </div>
  );
};

export default ErrorMsg;

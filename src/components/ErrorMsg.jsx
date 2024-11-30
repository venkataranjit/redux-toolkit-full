import { useSelector } from "react-redux";

const ErrorMsg = () => {
  const studentState = useSelector((state) => state.student);

  return <div className="alert alert-danger">{studentState.error}</div>;
};

export default ErrorMsg;

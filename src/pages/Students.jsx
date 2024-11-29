import { useDispatch, useSelector } from "react-redux";
import AddStudent from "../components/AddStudent";
import ViewStudents from "../components/ViewStudents";
import { useEffect } from "react";
import { getStudents } from "../app/studentSlice";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import UpdateStudentHistory from "../components/UpdateStudentHistory";

const Students = () => {
  const studentState = useSelector((state) => state.student);
  const dispatch = useDispatch();
  console.log(studentState);

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  if (studentState.isLoading) {
    return <Loader />;
  }
  if (studentState.error) {
    return <ErrorMsg />;
  }
  return (
    <>
      <h3>Students</h3>
      <div className="row">
        <div className="col">
          <AddStudent />
        </div>
        <div className="col">
          <UpdateStudentHistory />
        </div>
      </div>
      <ViewStudents />
    </>
  );
};

export default Students;

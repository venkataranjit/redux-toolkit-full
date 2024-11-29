import { useSelector } from "react-redux";
import AddTeacher from "../components/AddTeacher";
import ViewTeachers from "../components/ViewTeachers";
import { useDispatch } from "react-redux";
import { getTeachers } from "../app/teachersSlice";
import { useEffect } from "react";
import teachersData from "../app/teachersData";
import UpdateTeacherHistory from "../components/UpdateTeacherHistory";

const Teachers = () => {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getTeachers(teachersData));
  }, []);

  console.log(teacherState);
  return (
    <>
      <h3>Teachers</h3>
      <div className="row">
        <div className="col-sm-6">
          <AddTeacher />
        </div>
        <div className="col-sm-6">
          <UpdateTeacherHistory />
        </div>
      </div>

      <ViewTeachers />
    </>
  );
};

export default Teachers;

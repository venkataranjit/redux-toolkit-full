import { useSelector } from "react-redux";
import AddTeacher from "../components/AddTeacher";
import ViewTeachers from "../components/ViewTeachers";
import UpdateTeacher from "../components/UpdateTeacher";
import { useDispatch } from "react-redux";
import { getTeachers } from "../app/teachersSlice";
import { useEffect, useState } from "react";
import teachersData from "../app/teachersData";

const Teachers = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getTeachers(teachersData));
  }, []);

  console.log(teacher);
  return (
    <>
      <h3>Teachers</h3>
      <div className="row">
        <div className="col-sm-6">
          <AddTeacher />
        </div>
        <div className="col-sm-6">
          <UpdateTeacher />
        </div>
      </div>

      <ViewTeachers />
    </>
  );
};

export default Teachers;

import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, isEditTeacherIndex } from "../app/studentSlice";
import { Slide, toast } from "react-toastify";

const ViewStudents = () => {
  const studentState = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const deleteHandle = (id) => {
    dispatch(deleteStudent(id));
    toast("Student Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };
  const editHandle = (id) => {
    dispatch(isEditTeacherIndex(id));
  };

  return (
    <>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr className="table-dark">
            <th>Id</th>
            <th>Student Name</th>
            <th>Student Class</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {studentState.students.map((s) => (
            <tr key={s.id}>
              <td>{s.id.substring(0, 10)}</td>
              <td>{s.studentName}</td>
              <td>
                {s.studentClass === "others"
                  ? s.studentClassFeild
                  : s.studentClass}
              </td>
              <td style={{ textAlign: "center" }}>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => editHandle(s.id)}
                >
                  <span className="material-icons">mode_edit</span>
                </Button>
              </td>
              <td style={{ textAlign: "center" }}>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => deleteHandle(s.id)}
                >
                  <span className="material-icons">delete</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ViewStudents;

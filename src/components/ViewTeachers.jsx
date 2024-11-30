import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher } from "../app/teachersSlice";
import { Slide, toast } from "react-toastify";
import EditTeacher from "./EditTeacher";

const ViewTeachers = () => {
  const teacherState = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [editID, setEditID] = useState("");

  const deleteHandler = (id) => {
    dispatch(deleteTeacher(id));
    toast("Teacher Deleted", {
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

  const updateHandle = (id) => {
    setShow(true);
    setEditID(id);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {teacherState.teachers.length > 0 ? (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr className="table-dark">
              <th>Id</th>
              <th>Teacher Name</th>
              <th>Teacher Qualification</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {teacherState.teachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id.substring(0, 10)}</td>
                <td>{t.teacherName}</td>
                <td>{t.teacherQualification}</td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() => updateHandle(t.id)}
                  >
                    <span className="material-icons">mode_edit</span>
                  </Button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() => deleteHandler(t.id)}
                  >
                    <span className="material-icons">delete</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        ""
      )}
      <EditTeacher show={show} handleClose={handleClose} editID={editID} />
    </>
  );
};

export default ViewTeachers;

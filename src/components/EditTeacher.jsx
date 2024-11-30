import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormGroup, FormLabel } from "react-bootstrap";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacher } from "../app/teachersSlice";
import { Slide, toast } from "react-toastify";

const EditTeacher = ({ show, handleClose, editID }) => {
  const teacherState = useSelector((state) => state.teacher);
  const dispatch = useDispatch();
  const teacher = teacherState.teachers.find((t) => t.id === editID);

  const validation = Yup.object({
    teacherName: Yup.string()
      .required("Teacher Name is Required")
      .min(3, "Teacher Name must be minimum 3 characters required"),
    teacherQualification: Yup.string()
      .required("Qualification Required")
      .min(3, "Teacher Qualification must be minimum 3 characters"),
  });

  const submitHandle = (values, { resetForm }) => {
    dispatch(updateTeacher({ editID, ...values }));
    resetForm();
    handleClose();
    toast("Teacher Updated", {
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

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        {teacher && (
          <Formik
            initialValues={{
              teacherName: teacher.teacherName,
              teacherQualification: teacher.teacherQualification,
            }}
            validationSchema={validation}
            onSubmit={submitHandle}
          >
            {({ isValid, dirty }) => (
              <Form>
                <Modal.Body>
                  <FormGroup className="mb-3" controlId="teacherName">
                    <FormLabel>Name</FormLabel>
                    <Field
                      type="text"
                      placeholder="Enter Name"
                      name="teacherName"
                      className="form-control"
                    />
                  </FormGroup>
                  <ErrorMessage
                    name="teacherName"
                    component="div"
                    className="alert alert-danger"
                  />
                  <FormGroup className="mb-3" controlId="teacherQualification">
                    <FormLabel>Qualification</FormLabel>
                    <Field
                      type="text"
                      placeholder="Enter Qualification"
                      name="teacherQualification"
                      className="form-control"
                    />
                  </FormGroup>
                  <ErrorMessage
                    name="teacherQualification"
                    component="div"
                    className="alert alert-danger"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!(isValid && dirty)}
                  >
                    Edit Teacher
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </>
  );
};

export default EditTeacher;

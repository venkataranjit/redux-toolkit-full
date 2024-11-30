import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import * as Yup from "yup";
import { addStudent, editStudent } from "../app/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slide, toast } from "react-toastify";

const AddStudent = () => {
  const dispatch = useDispatch();
  const studentState = useSelector((state) => state.student);

  const [initialValues, setInitialValues] = useState({
    studentName: "",
    studentClass: "",
  });

  const editedStudent = studentState.students.find(
    (s) => s.id === studentState.isEdit
  );

  useEffect(() => {
    if (studentState.isEdit) {
      setInitialValues({
        studentName: editedStudent.studentName,
        studentClass: editedStudent.studentClass,
      });
    } else {
      setInitialValues({
        studentName: "",
        studentClass: "",
      });
    }
  }, [studentState.isEdit]);

  const validationSchema = Yup.object({
    studentName: Yup.string().required("Student Name is Required"),
  });

  const validate = (values) => {
    const errors = {};
    if (values.studentClass === "") {
      errors.studentClass = "Please Enter Student Class";
    }
    return errors;
  };

  const onSubmit = (values, { resetForm }) => {
    if (studentState.isEdit) {
      dispatch(editStudent({ id: studentState.isEdit, ...values }));
      toast("Student Edited", {
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
    } else {
      dispatch(addStudent(values));
      toast("Student Added", {
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
    }
    resetForm();
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty }) => (
          <Form>
            <FormGroup className="mb-3" controlId="studentName">
              <FormLabel>Student Name</FormLabel>
              <FormControl
                as={Field}
                type="text"
                placeholder="Student Name"
                name="studentName"
              />
            </FormGroup>
            <ErrorMessage
              component="div"
              className="alert alert-danger"
              name="studentName"
            ></ErrorMessage>
            <FormGroup className="mb-3" controlId="studentClass">
              <FormLabel>Student Class</FormLabel>
              <FormControl
                as={Field}
                type="text"
                placeholder="Student Class"
                name="studentClass"
              />
            </FormGroup>
            <ErrorMessage
              component="div"
              className="alert alert-danger"
              name="studentClass"
            />
            <Button
              variant="primary"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              {studentState.isEdit ? "Edit Student" : "Add Student"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddStudent;

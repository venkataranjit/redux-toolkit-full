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
    studentClassFeild: "",
  });

  const editedStudent = studentState.students.find(
    (s) => s.id === studentState.isEdit
  );

  useEffect(() => {
    if (studentState.isEdit) {
      setInitialValues({
        studentName: editedStudent.studentName,
        studentClass: editedStudent.studentClass,
        studentClassFeild: editedStudent.studentClassFeild,
      });
    } else {
      setInitialValues({
        studentName: "",
        studentClass: "",
        studentClassFeild: "",
      });
    }
  }, [studentState.isEdit]);

  const validationSchema = Yup.object({
    studentName: Yup.string().required("Student Name is Required"),
    studentClassFeild: Yup.string().required("Student Class is Required"),
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
        {({ isValid, dirty, values }) => (
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
              <Field
                as="select"
                placeholder="Student Class"
                name="studentClass"
                className="form-select"
              >
                <option disabled selected value="">
                  Select Class
                </option>
                <option value="1st">1st Std</option>
                <option value="2nd">2nd Std</option>
                <option value="3rd">3rd Std</option>
                <option value="others">Others</option>
              </Field>
            </FormGroup>
            <ErrorMessage
              component="div"
              className="alert alert-danger"
              name="studentClass"
            />
            {values.studentClass === "others" ? (
              <>
                <FormGroup className="mb-3" controlId="studentClassFeild">
                  <FormControl
                    as={Field}
                    type="text"
                    placeholder="Enter Class"
                    name="studentClassFeild"
                  />
                </FormGroup>
                <ErrorMessage
                  component="div"
                  className="alert alert-danger"
                  name="studentClassFeild"
                ></ErrorMessage>
              </>
            ) : (
              ""
            )}
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

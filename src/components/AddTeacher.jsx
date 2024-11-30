import Button from "react-bootstrap/Button";
import { FormGroup, FormLabel } from "react-bootstrap";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTeacher } from "../app/teachersSlice";
import { Slide, toast } from "react-toastify";

const AddTeacher = () => {
  const dispatch = useDispatch();

  const initialValues = {
    teacherName: "",
    teacherQualification: "",
  };

  const validation = Yup.object({
    teacherName: Yup.string()
      .required("Teacher Name is Required")
      .min(3, "Teacher Name must be minimum 3 characters required"),
    teacherQualification: Yup.string()
      .required("Qualification Required")
      .min(3, "Teacher Qualification must be minimum 3 characters"),
  });

  const submitHandle = (values, { resetForm }) => {
    dispatch(addTeacher(values));
    toast("Teacher Added", {
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

    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={submitHandle}
      >
        {({ isValid, dirty }) => (
          <Form>
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
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={!(isValid && dirty)}
              >
                Add Teacher
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddTeacher;

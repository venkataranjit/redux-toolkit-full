import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordHandler = () => {
    setShowPassword((p) => !p);
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email Required"),
    password: Yup.string().required("Enter password"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <Field
              type="text"
              name="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              autoFocus
            />
            <ErrorMessage
              component="div"
              name="email"
              className="alert alert-danger"
            ></ErrorMessage>
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <div className="password-feild">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
              />
              <span
                className="material-icons show-password"
                onClick={passwordHandler}
              >
                remove_red_eye
              </span>
            </div>
            <ErrorMessage
              component="div"
              name="password"
              className="alert alert-danger"
            ></ErrorMessage>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="btn btn-lg btn-primary btn-block sign-in"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Sign in
            </button>
            <label className="form-label">
              Already Have an account? <Link to="/login"> Login Here</Link>
            </label>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;

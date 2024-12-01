import { ErrorMessage, Field, Form, Formik } from "formik";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck } from "../app/usersSlice";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";

const Login = () => {
  const [captchaError, setCaptchaError] = useState("");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    captcha: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is Not Valid")
      .required("Email Feild Required"),
    password: Yup.string().required("Password is Required"),
    captcha: Yup.string().required("Captcha Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    if (validateCaptcha(values.captcha, false) == true) {
      await dispatch(
        loginCheck({ email: values.email, password: values.password })
      );
      resetForm();
      setCaptchaError("");
      loadCaptchaEnginge(6);
    } else {
      loadCaptchaEnginge(6);
      setCaptchaError("Captcha Does Not Match");
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [dispatch]);

  useEffect(() => {
    if (userState.loggedInUser?.email) {
      navigate("/home");
    }
  }, [userState.loggedInUser, navigate]);

  if (userState.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <>
            <Form className="form-signin">
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>
              <Field
                type="email"
                id="inputEmail"
                className="form-control mb-3"
                placeholder="Email address"
                name="email"
                autoComplete="email"
              />
              <ErrorMessage
                component="div"
                className="alert alert-danger"
                name="email"
              ></ErrorMessage>
              <label htmlFor="inputPassword" className="sr-only">
                Password
              </label>
              <Field
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                name="password"
                autoComplete="password"
              />
              <ErrorMessage
                component="div"
                className="alert alert-danger"
                name="password"
              ></ErrorMessage>
              <div className="mb-3 captchaPosition">
                <LoadCanvasTemplate />
                <Field
                  type="text"
                  id="captcha"
                  className="form-control mb-3"
                  placeholder="Enter Captcha"
                  name="captcha"
                />
                {captchaError && (
                  <Alert className="alert alert-danger">{captchaError}</Alert>
                )}
              </div>
              <button
                className="btn btn-lg btn-primary btn-block sign-in"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Sign in
              </button>
              <label className="form-label">
                Don&apos;t Have Login <Link to="/register"> Register Here</Link>
              </label>
              {userState.error && <ErrorMsg />}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default Login;

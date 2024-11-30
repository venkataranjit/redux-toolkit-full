import { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/usersSlice";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import { Slide, toast } from "react-toastify";

const Register = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [captchaError, setCaptchaError] = useState("");
  const [showPassword, setShowPassword] = useState({
    pwd: false,
    confirmPwd: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((p) => ({ ...p, [field]: !p[field] }));
  };

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    user_captcha_input: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email Required"),
    password: Yup.string()
      .required("Enter password")
      .min(8, "min 8 characters required"),
    confirmPassword: Yup.string()
      .required("Confirm password Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    user_captcha_input: Yup.string().required("Captcha is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    if (validateCaptcha(values.user_captcha_input)) {
      await dispatch(
        registerUser({ email: values.email, password: values.password })
      );
      setCaptchaError("");
      resetForm();
      loadCaptchaEnginge(6);
      toast("User Registered Succesfully", {
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
      setCaptchaError("Captcha does not match");
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [dispatch]);

  if (userState.isLoading) {
    return <Loader />;
  }
  if (userState.error) {
    return <ErrorMsg />;
  }

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
              autoComplete="email"
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
                type={showPassword.pwd ? "text" : "password"}
                name="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                autoComplete="password"
              />
              <span
                className="material-icons show-password"
                onClick={() => togglePasswordVisibility("pwd")}
                role="button"
              >
                {showPassword.pwd ? "visibility_off" : "visibility"}
              </span>
            </div>
            <ErrorMessage
              component="div"
              name="password"
              className="alert alert-danger"
            ></ErrorMessage>
            <label htmlFor="inputConfirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="password-feild">
              <Field
                type={showPassword.confirmPwd ? "text" : "password"}
                name="confirmPassword"
                id="inputConfirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                autoComplete="password"
              />
              <span
                className="material-icons show-password"
                onClick={() => togglePasswordVisibility("confirmPwd")}
                role="button"
              >
                {showPassword.confirmPwd ? "visibility_off" : "visibility"}
              </span>
            </div>
            <ErrorMessage
              component="div"
              name="confirmPassword"
              className="alert alert-danger"
            ></ErrorMessage>
            <div className="mb-3 captchaPosition">
              <LoadCanvasTemplate />
              <Field
                type="text"
                name="user_captcha_input"
                id="user_captcha_input"
                className="form-control"
                placeholder="Enter Captcha"
              />
            </div>
            {captchaError && (
              <Alert className="alert-danger">{captchaError}</Alert>
            )}

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

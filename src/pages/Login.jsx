import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox mb-3"></div>
        <button
          className="btn btn-lg btn-primary btn-block sign-in"
          type="submit"
        >
          Sign in
        </button>
        <label className="form-label">
          Dont Have Login <Link to="/register"> Register Here</Link>
        </label>
      </form>
    </>
  );
};

export default Login;

import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { useForm } from "react-hook-form";
import { UserContext } from "../../actions/UserContext";

const Login = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const { value, setValue } = useContext(UserContext);
  // const [state, setState] = useState({
  //   error: Boolean,
  // });

  const onSubmit = async (data) => {
    try {
      let response = await login(data);

      await setValue({
        ...value,
        error: response || false,
        admin: response.resData?.role === "admin",
        editor: response.resData?.role === "editor",
      });
    } catch (err) {
      console.log(err);
    }

    reset();
  };

  setTimeout(() => {
    setValue({ ...value, error: false });
  }, 4000);

  //Redirect if logged in
  if (props.adminToken || props.token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div style={{ backgroundColor: "#56c8c8", padding: "1rem" }}>
      {value.error ? (
        <h3 style={{ color: "red" }}>Invalid Credentials</h3>
      ) : null}

      <h1>Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minLength="3"
            {...register("password")}
          />
        </div>

        <input
          type="submit"
          style={{ color: "white" }}
          className="btn"
          value="Login"
        />
      </form>
      <p>
        Don't have an account{" "}
        <Link style={{ color: "blue" }} to="/register">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;

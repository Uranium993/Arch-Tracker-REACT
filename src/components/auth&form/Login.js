import React from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { useForm } from "react-hook-form";

const Login = ({ isAuthenticated }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await login(data);
    reset();
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container2">
      <h1 className="large text-primary">Sign In</h1>
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

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;

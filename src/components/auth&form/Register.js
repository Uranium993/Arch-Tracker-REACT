import React from "react";
import { Link, Redirect } from "react-router-dom";
import { registerEditor } from "../../actions/auth";
import { useForm } from "react-hook-form";
import { QueryCache, QueryClient, useMutation } from "react-query";
import "./forms.css";

const Register = ({ isAuthenticated, role }) => {
  const { register, handleSubmit, reset } = useForm();

  const client = new QueryCache();

  console.log(client.getAll());

  const mutation = useMutation((data) => registerEditor(data));

  const onSubmit = async (data) => {
    data.role = role;
    if (data.password !== data.password2) {
      console.log("Passwords do not match", "danger");
    } else {
      await mutation.mutate(data);
    }
    reset();
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="form-container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input type="text" placeholder="Name" {...register("name")} />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("password2")}
          />
        </div>
        <button className="btn btn-primary">
          {mutation.isLoading ? (
            "Loading..."
          ) : mutation.isSuccess ? (
            "Success!"
          ) : (
            <input type="submit" value="Register" />
          )}
        </button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

/* Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
} */

export default Register;

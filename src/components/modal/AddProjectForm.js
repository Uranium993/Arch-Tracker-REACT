import "./modalForms.css";
import { useForm } from "react-hook-form";

function AddProjectForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    let checkedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== "")
    );

    await console.log(checkedData);
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <h4>Enter client name*</h4>
        <input
          type="text"
          placeholder="Client Name"
          {...register("clientName")}
          required
        />
      </div>

      <div className="form-group">
        <h4>Enter unique project codename*</h4>

        <input
          type="text"
          placeholder="Project Codename"
          {...register("codename")}
          required
        />
      </div>
      <div className="form-group">
        <h4>Enter email adress(optional)</h4>

        <input type="email" placeholder="Client email" {...register("email")} />
      </div>
      <div className="form-group">
        <h4>Enter client phone(optional)</h4>

        <input
          type="number"
          placeholder="Client phone"
          {...register("phone")}
        />
      </div>

      <input
        type="submit"
        className="btn btn-primary"
        style={{ color: "#00e674" }}
        value="Submit Project"
      />
    </form>
  );
}

export default AddProjectForm;

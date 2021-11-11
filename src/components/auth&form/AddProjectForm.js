import "./forms.css";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { addProject, editProjectInfo } from "../../actions/queryProjects";
import { Typography } from "@material-ui/core";

function AddProjectForm(props) {
  const queryClient = useQueryClient();

  const showEdit = props.showEdit ? true : false;

  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation(
    (data) => {
      if (showEdit) {
        editProjectInfo(data, props.projectID);
      } else {
        addProject(data);
      }
    },
    {
      onSuccess: () => {
        if (showEdit) {
        } else {
          props.close();
          return queryClient.invalidateQueries("projects");
        }
        return queryClient.invalidateQueries("projects");
      },
    }
  );

  const onSubmit = async (data) => {
    let checkedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== "")
    );

    mutation.mutate(checkedData);

    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {showEdit ? null : (
        <div className={showEdit ? "edit_form" : "form-group"}>
          <Typography
            style={showEdit ? { color: "lightblue" } : { color: "" }}
            variant={showEdit ? "subtitle2" : "subtitle1"}
          >
            Enter client name*
          </Typography>
          <input
            type="text"
            placeholder="Client Name"
            {...register("clientName")}
            required
          />
        </div>
      )}

      {showEdit ? null : (
        <div className={showEdit ? "edit_form" : "form-group"}>
          <Typography
            style={showEdit ? { color: "lightblue" } : { color: "" }}
            variant={showEdit ? "subtitle2" : "subtitle1"}
          >
            Enter unique project codename*
          </Typography>

          <input
            type="text"
            placeholder="Project Codename"
            {...register("codename")}
            required
          />
        </div>
      )}

      <div className={showEdit ? "edit_form" : "form-group"}>
        <Typography
          style={showEdit ? { color: "lightblue" } : { color: "" }}
          variant={showEdit ? "subtitle2" : "subtitle1"}
        >
          Enter client email{showEdit ? null : "(optional)"}
        </Typography>

        <input
          type="email"
          placeholder="Client email"
          {...register("clientMail")}
        />
      </div>
      <div className={showEdit ? "edit_form" : "form-group"}>
        <Typography
          style={showEdit ? { color: "lightblue" } : { color: "" }}
          variant={showEdit ? "subtitle2" : "subtitle1"}
        >
          Enter client phone{showEdit ? null : "(optional)"}
        </Typography>

        <input
          type="text"
          placeholder="Client phone"
          {...register("clientNumber")}
        />
      </div>
      <div className={showEdit ? "edit_form" : "form-group"}>
        <Typography
          style={showEdit ? { color: "lightblue" } : { color: "" }}
          variant={showEdit ? "subtitle2" : "subtitle1"}
        >
          Estimated Worth{showEdit ? null : "(optional)"}
        </Typography>

        <input
          type="number"
          placeholder="EUR"
          {...register("estimatedWorth")}
        />
      </div>
      <div className={showEdit ? "edit_form" : "form-group"}>
        <Typography
          style={showEdit ? { color: "lightblue" } : { color: "" }}
          variant={showEdit ? "subtitle2" : "subtitle1"}
        >
          Final Worth{showEdit ? null : "(optional)"}
        </Typography>

        <input type="number" placeholder="EUR" {...register("finalWorth")} />
      </div>
      <input
        type="submit"
        className="btn btn-primary"
        style={{ color: "#00e674" }}
        value={showEdit ? "Submit Edit" : "Submit Project"}
      />
    </form>
  );
}

export default AddProjectForm;

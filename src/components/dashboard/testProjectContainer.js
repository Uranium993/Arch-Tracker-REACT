import React from "react";
import Phases from "./Phases";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../materialStyles/projectContainerStyle";
import FirstColumn from "./FirstColumn";
import { useQuery } from "react-query";
import { getSingleProject } from "../../actions/queryProjects";

const ProjectContainer = ({
  clientName,
  clientMail,
  phone,
  codename,
  phases,
  id,
}) => {
  const classes = useStyles();

  const projectQuery = useQuery(
    ["project", id.toString()],
    async () => await getSingleProject(id),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  console.log(projectQuery);

  return (
    <div className={classes.root}>
      <Grid className={classes.singleProject} key={id}>
        <Grid item className={classes.firstColumnWrapper}>
          <FirstColumn
            className={classes.firstColumn}
            clientName={clientName}
            clientMail={clientMail}
            phone={phone}
          />
        </Grid>
        <div className={classes.codeName}>
          <div>{codename}</div>
        </div>

        <Grid>
          <Phases phases={phases} projectID={id} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectContainer;

{
  queryInfo.isLoading
    ? "LOADING......"
    : queryInfo.isSuccess
    ? Array.from(queryInfo.data)
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.clientName
              .toLocaleLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((item) => (
          <ProjectContainer
            clientName={item.clientName}
            clientMail={item.clientMail}
            phone={item.phone}
            codename={item.codename}
            phases={item.phases}
            id={item._id}
            // queryInfo={Array.from(queryInfo.data)}
            searchTerm={searchTerm}
          />
        ))
    : null;
}

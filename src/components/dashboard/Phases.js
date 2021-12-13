import React from "react";
import Phase from "./Phase";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import { getSingleProjectPhase } from "../../actions/queryProjects";
import { useStyles } from "../materialStyles/phasesStyles";

const Phases = ({ projectID }) => {
  const classes = useStyles();

  const projectQuery = useQuery(
    ["projectPhases", projectID],
    async () => await getSingleProjectPhase(projectID),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Grid wrap="wrap" className={classes.root} container>
      {projectQuery?.data?.map((phase) => (
        <Grid key={phase._id} className={classes.singleItem} item>
          <Phase className={classes.item} phase={phase} projectID={projectID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Phases;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Phase from "./Phase";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import { getSingleProject } from "../../actions/queryProjects";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      alignSelf: "center",
    },
  },

  singleItem: {
    [theme.breakpoints.up("lg")]: {
      width: "11rem",
    },
    // [theme.breakpoints.down("lg")]: {
    //   width: "11rem",
    // },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Phases = ({ projectID }) => {
  const classes = useStyles();

  const projectQuery = useQuery(
    ["project", projectID],
    async () => await getSingleProject(projectID),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
    }
  );

  console.log();

  return (
    <Grid
      wrap="wrap"
      className={classes.root}
      container
      // style={{
      //   display: "flex",
      //   flexDirection: "",
      // }}
    >
      {projectQuery?.data?.map((phase) => (
        <Grid key={phase._id} className={classes.singleItem} item>
          <Phase className={classes.item} phase={phase} projectID={projectID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Phases;

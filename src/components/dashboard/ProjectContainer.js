import React from "react";
import Phases from "./Phases";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import FirstColumn from "./FirstColumn";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6rem",
  },

  // clientName: {
  //   width: "15rem",
  // },

  singleProject: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  codeName: {
    fontWeight: "200",

    padding: 13,
    textAlign: "center",
    color: "rgb(115, 249, 188)",
    backgroundColor: "black",
    borderRight: "solid 1px rgb(115, 249, 188)",
    height: "48px",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  firstColumn: {
    //width: "14rem",
    backgroundColor: "black",
    color: "rgb(115, 249, 188)",
    borderRight: "1px solid rgb(115, 249, 188)",
    fontWeight: "200",
  },

  firstColumnWrapper: {
    [theme.breakpoints.up("md")]: {
      width: "16%",
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  iconWrap: {
    display: "flex",
    alignItems: "flex-start",
  },
  icon: {
    height: "40px",
    background: "#E74C3C",
    display: "flex",
    alignItems: "center",
    border: "1px solid",

    "&:hover": {
      opacity: "0.5",
      cursor: "pointer",
    },
  },
}));

const ProjectContainer = ({ searchTerm, testData }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {testData
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
        .map(({ clientName, code, phases }) => (
          <Grid className={classes.singleProject} key={Math.random()}>
            <Grid item className={classes.firstColumnWrapper}>
              <FirstColumn
                className={classes.firstColumn}
                clientName={clientName}
              />
            </Grid>
            <div className={classes.codeName}>
              <div>{code}</div>
            </div>

            <Grid>
              <Phases phases={phases} />
            </Grid>
          </Grid>
        ))}
    </div>
  );
};

export default ProjectContainer;

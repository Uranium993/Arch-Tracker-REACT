import React from "react";
import Phases from "./Phases";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../materialStyles/projectContainerStyle";
import FirstColumn from "./FirstColumn";

const ProjectContainer = ({ searchTerm, queryInfo }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {queryInfo
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
        .map(
          ({
            clientName,
            clientMail,
            clientNumber,
            codename,
            estimatedWorth,
            finalWorth,
            _id,
          }) => (
            <Grid className={classes.singleProject} key={_id}>
              <Grid item className={classes.firstColumnWrapper}>
                <FirstColumn
                  className={classes.firstColumn}
                  clientName={clientName}
                  clientMail={clientMail}
                  clientNumber={clientNumber}
                  estimatedWorth={estimatedWorth}
                  finalWorth={finalWorth}
                  projectID={_id}
                />
              </Grid>
              <div className={classes.codeName}>
                <div>{codename}</div>
              </div>

              <Grid>
                <Phases projectID={_id} />
              </Grid>
            </Grid>
          )
        )}
    </div>
  );
};

export default ProjectContainer;

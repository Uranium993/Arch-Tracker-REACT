import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Phase from "./Phase";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      alignSelf: "center",
    },
  },

  singleItem: {
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "11rem",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Phases = ({ phases }) => {
  const classes = useStyles();
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
      {phases.map((phase) => (
        <Grid key={phase.name} className={classes.singleItem} item>
          <Phase className={classes.item} key={phase.name} phase={phase} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Phases;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckboxArr from "../Buttons&checks/CheckboxArr";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    fontFamily: "Tahoma",
    marginRight: "1px",
    "& #IDR": {
      backgroundColor: props.color,
      color: "white",
    },
    "& #IDP": {
      backgroundColor: props.color,
      color: "white",
    },
    "& #PGD": {
      backgroundColor: props.color,
      color: "white",
    },
    "& #PZI": {
      backgroundColor: props.color,
      color: "white",
    },
    "& #PIO": {
      backgroundColor: props.color,
      color: "white",
    },
    "& .MuiAccordionSummary-content": {
      justifyContent: "center",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0 0 1rem 0",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
    },
  }),

  // details: {
  //   backgroundColor: "white",
  // },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    color: "black",
  },
}));

function Phase({ phase: { name, color, docs } }) {
  const props = { color: color };

  const classes = useStyles(props);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={classes.root}>
        <div>
          <Accordion expanded={expanded === name} onChange={handleChange(name)}>
            <AccordionSummary
              aria-controls={name}
              id={name}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}> {name} </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <CheckboxArr docs={docs} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Phase;

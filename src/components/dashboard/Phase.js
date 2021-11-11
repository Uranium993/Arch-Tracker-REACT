import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckboxArr from "../Buttons&checks/CheckboxArr";
import { useStyles } from "../materialStyles/phaseStyle";

function Phase({ phase: { name, color, docs, _id }, projectID }) {
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
              <CheckboxArr
                docs={docs}
                id={_id}
                projectID={projectID}
                name={name}
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Phase;

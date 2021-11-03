import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const Icon = styled(ExpandMoreIcon)`
  color: white;
`;
const FirstColumn = ({ clientName, className }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid>
      <Accordion
        className={className}
        expanded={expanded === clientName}
        onChange={handleChange(clientName)}
      >
        <AccordionSummary
          aria-controls={clientName}
          id={clientName}
          expandIcon={<Icon />}
        >
          {clientName}
        </AccordionSummary>
        <AccordionDetails>
          <div>
            djordjino@gmail.com
            <br />
            <br />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "lightgreen",
              }}
            ></div>
            <br />
            +381 63 62 62 553
          </div>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default FirstColumn;

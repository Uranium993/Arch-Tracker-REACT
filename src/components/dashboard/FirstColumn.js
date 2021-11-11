import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { deleteProject, editProjectInfo } from "../../actions/queryProjects";
import Button from "../Buttons&checks/Button";
import { useMutation, useQueryClient } from "react-query";
import ConfirmDialog from "../modal/ConfirmDialog";
import AddProjectForm from "../auth&form/AddProjectForm";
import { useSpring, animated } from "react-spring";

const Icon = styled(ExpandMoreIcon)`
  color: white;
`;
const Details = styled(AccordionDetails)`
  display: block;
`;

//-----------------------Function Component Init----------------------------------

const FirstColumn = ({
  clientMail,
  clientName,
  clientNumber,
  estimatedWorth,
  finalWorth,
  className,
  projectID,
}) => {
  const queryClinet = useQueryClient();

  const [expanded, setExpanded] = useState(false);
  const [showEditForm, setshowEditForm] = useState(false);
  const [confirm, setConfirm] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const openModal = () => {
    setshowEditForm((prev) => !prev);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mutation = useMutation(
    (e) => {
      if (e.target.name === "delete") {
        setConfirm({
          isOpen: true,
          title: "Are you sure you want to DELETE project?",
          subtitle: "This cannot be undone!",
          onConfirm: () => {
            deleteProject(projectID);
          },
        });
      } else if (e.target.name === "archive") {
        setConfirm({
          isOpen: true,
          title: "Are you sure you want to archive this project?",
          subtitle: "You can pull it back grom archive",
          onConfirm: () => {
            editProjectInfo(projectID);
          },
        });
      } else {
        console.log("edit");
      }
    },
    {
      onSuccess: () => queryClinet.invalidateQueries("projects"),
    }
  );

  const handleButtons = (e) => {
    mutation.mutate(e);
  };

  const animation = useSpring({
    config: {
      duration: 500,
    },
    opacity: showEditForm ? 1 : 0,
    transform: showEditForm ? `opacity: 0` : `opacity: 1`,
    transform: showEditForm ? `translateY(0)` : `translateY(-10%)`,
  });

  return (
    <Grid item>
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
        <Details>
          <div
            style={{
              borderBottom: "1px solid lightgreen",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            email: {clientMail}
            <br />
          </div>
          <div
            style={{
              borderBottom: "1px solid lightgreen",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            Phone: {clientNumber}
          </div>
          <div
            style={{
              borderBottom: "1px solid lightgreen",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            Estimated $:{" "}
            <div
              style={{ display: "inline", width: "100%", margin: "auto" }}
            ></div>{" "}
            {estimatedWorth}
          </div>
          <div
            style={{
              borderBottom: "1px solid lightgreen",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            Final $: {finalWorth}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                onClick={openModal}
                name="edit"
                type="rounded-outline"
                style={{
                  width: "80%",
                  height: "2rem",
                  backgroundColor: "#1890ff",
                  color: "white",
                  marginBottom: "1rem",
                  fontSize: "1.2em",
                }}
              >
                Edit
              </Button>
              {showEditForm ? (
                <animated.div style={animation}>
                  <AddProjectForm
                    projectID={projectID}
                    showEdit={showEditForm}
                  />
                </animated.div>
              ) : null}
              <Button
                onClick={(e) => mutation.mutate(e, projectID)}
                name="archive"
                type="rounded-outline"
                style={{
                  width: "80%",
                  height: "2rem",
                  backgroundColor: "teal",
                  color: "white",
                  marginBottom: "1rem",
                  fontSize: "1.2em",
                }}
              >
                Archive
              </Button>
              <Button
                style={{ width: "80%", height: "2rem", fontSize: "1.2em" }}
                name="delete"
                btnColor="#e74c3c"
                type="rounded-outline"
                onClick={(e) => handleButtons(e, projectID)}
              >
                Delete Project
              </Button>
            </div>
          </div>
        </Details>
      </Accordion>
      <ConfirmDialog confirm={confirm} setConfirm={setConfirm} />
    </Grid>
  );
};

export default FirstColumn;

import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import Button from "../Buttons&checks/Button";
import ConfirmDialog from "../modal/ConfirmDialog";
import AddProjectForm from "../auth&form/AddProjectForm";
//Hooks
import { useSpring, animated } from "react-spring";
import { useMutation, useQueryClient, useQuery } from "react-query";
//Actions
import {
  deleteProject,
  editProjectInfo,
  getSingleProject,
} from "../../actions/queryProjects";

const Icon = styled(ExpandMoreIcon)`
  color: white;
`;
const Details = styled(AccordionDetails)`
  display: block;
`;

//-----------------------Function Component Init----------------------------------//

const FirstColumn = ({ clientName, className, projectID }) => {
  const queryClient = useQueryClient();

  const [expanded, setExpanded] = useState(false);
  const [showEditForm, setshowEditForm] = useState(false);
  const [confirm, setConfirm] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    inactive: Boolean,
  });

  useEffect(() => {
    if (showEditForm === true && expanded === false) {
      setshowEditForm(false);
    }
  }, [expanded, showEditForm]);

  const openModal = () => {
    setshowEditForm((prev) => !prev);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //---------------------Get single project---------------------------//

  const project = useQuery(
    ["project", projectID],
    () => getSingleProject(projectID),
    {
      retry: 0,
      staleTime: 5000 * 60,
    }
  );

  //-------------------------mutations---------------------------------//

  const deleteMutation = useMutation(
    () => {
      return deleteProject(projectID);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("projects");
      },
    }
  );

  const arhiveMutation = useMutation(
    (data) => {
      editProjectInfo(data, projectID);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );

  //----------------------Animation--------------------------------//

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
            {" "}
            <span style={{ color: "rgb(24, 144, 255)" }}>Email:</span>{" "}
            {project.isSuccess ? project.data[0].clientMail : null}
            <br />
          </div>
          <div
            style={{
              borderBottom: "1px solid lightgreen",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ color: "rgb(24, 144, 255)" }}>Phone:</span>{" "}
            {project.isSuccess ? project.data[0].clientNumber : null}
          </div>
          <div
            style={{
              borderBottom: "1px solid lightgreen",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ color: "rgb(24, 144, 255)" }}>Estimated $:</span>{" "}
            <div
              style={{ display: "inline", width: "100%", margin: "auto" }}
            ></div>{" "}
            {project.isSuccess ? project.data[0].estimatedWorth : null}
          </div>
          <div
            style={{
              borderBottom: "1px solid lightgreen",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ color: "rgb(24, 144, 255)" }}>Final $:</span>{" "}
            {project.isSuccess ? project.data[0].finalWorth : null}
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
                onClick={(e) => {
                  setConfirm({
                    isOpen: true,
                    title: "Are you sure you want to archive this project?",
                    subtitle: "You can pull it back from archive",
                    onConfirm: (inactive = { inactive: true }) => {
                      arhiveMutation.mutate(inactive);
                    },
                  });
                }}
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
                style={{
                  width: "80%",
                  height: "2rem",
                  fontSize: "clamp(5px, 1em, 1.5em",
                }}
                name="delete"
                btnColor="#e74c3c"
                type="rounded-outline"
                onClick={() => {
                  setConfirm({
                    isOpen: true,
                    title: "Are you sure you want to DELETE project?",
                    subtitle: "This cannot be undone!",
                    onConfirm: () => {
                      deleteMutation.mutate();
                    },
                  });
                }}
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

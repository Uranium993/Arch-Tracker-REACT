import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6rem",
  },

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
    minWidth: "150px",

    padding: 13,
    textAlign: "center",
    color: "rgb(115, 249, 188)",
    backgroundColor: "rgb(28, 28, 28)",
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
    backgroundColor: "rgb(28, 28, 28)",
    color: "rgb(115, 249, 188)",
    borderRight: "1px solid rgb(115, 249, 188)",
    fontWeight: "200",
    [theme.breakpoints.down("sm")]: {
      borderTop: "1px solid green",
      borderBottom: "1px solid green",
    },
  },

  firstColumnWrapper: {
    justifyContent: "center",

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

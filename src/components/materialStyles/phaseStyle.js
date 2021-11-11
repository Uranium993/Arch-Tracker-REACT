import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      alignSelf: "center",
    },
  },

  singleItem: {
    [theme.breakpoints.up("lg")]: {
      width: "11rem",
    },
    // [theme.breakpoints.down("lg")]: {
    //   width: "11rem",
    // },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

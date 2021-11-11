import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Button, Typography } from "antd";

function ConfirmDialog(props) {
  const { confirm, setConfirm } = props;
  return (
    <Dialog open={confirm.isOpen}>
      <DialogTitle>Warning!</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{confirm.title}</Typography>
        <Typography variant="subtitle2">{confirm.subtitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="gray"
          onClick={() => setConfirm({ ...confirm, isOpen: false })}
        >
          No
        </Button>

        <Button
          type="primary"
          danger
          onClick={() => {
            confirm.onConfirm();
            return setConfirm({
              ...confirm,
              isOpen: false,
            });
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;

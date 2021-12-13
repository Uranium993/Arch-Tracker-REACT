import React from "react";
import Button from "./Button";

function AddProjectBtn({ onClick }) {
  return (
    <div>
      <Button
        style={{ margin: "1rem 1rem 1rem 0rem" }}
        onClick={(e) => onClick(e)}
        type="outline"
        //btnColor="#40a9ff"
        btnColor="#27AE60"
      >
        <span style={{ margin: "0 0.8rem 0 -0.5rem" }}>
          <i className="fas fa-folder-plus"></i>
        </span>
        Add Project
      </Button>
    </div>
  );
}

export default AddProjectBtn;

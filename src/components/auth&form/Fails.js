import React from "react";

function Fails({ adminExists }) {
  if (adminExists)
    return (
      <h1 style={{ marginTop: "10rem", color: "white" }}>
        admin already exists!
      </h1>
    );
}

export default Fails;

//Prevent rerenders on accordion click!!!

import React, { useState } from "react";
// import { addCheckData } from "../../actions/checkForm";
import Checkbox from "../Buttons&checks/Checkbox";
// import { Checkbox } from "@material-ui/core";
import Button from "../Buttons&checks/Button";

function CheckboxArr({ docs }) {
  const [checkData, setcheckData] = useState({
    color: "gray",
    // form: Math.random() * 10,
    docs,
  });

  //Vertical doc checks
  const handleChange = (e) => {
    const isChecked = !!e.target.value;
    const docName = e.target.name;

    const newDocs = checkData.docs.map((doc) => {
      if (doc.docName === docName) {
        return { ...doc, chk: isChecked };
      } else {
        return doc;
      }
    });

    setcheckData({ ...checkData, docs: newDocs });
  };

  //Horisontal color checks
  const [checkColors, setCheckColors] = useState({
    gray: false,
    blue: false,
    orange: false,
    green: false,
    purple: false,
  });

  const { gray, blue, orange, green, purple } = checkColors;

  const loopKeys = (e) => {
    e.preventDefault();
    let newColorsObj;

    for (let keys in checkColors) {
      newColorsObj = checkColors[keys] = e.target.value === keys.toString();
    }

    setCheckColors({
      ...checkColors,
      newColorsObj,
    });
  };

  const onSubmit = (e) => console.log(e.target);

  return (
    <form
      id={1}
      style={{ display: "block" }}
      className="checkbox_form"
      onSubmit={onSubmit}
    >
      <div className="color_checkboxes">
        <input
          type="checkbox"
          name="gray"
          id="gray"
          checked={gray}
          value={"gray"}
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.name });
          }}
        />
        <input
          type="checkbox"
          name="blue"
          id="blue"
          checked={blue}
          value={"blue"}
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.name });
          }}
        />
        <input
          type="checkbox"
          name="orange"
          id="orange"
          checked={orange}
          value={"orange"}
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.name });
          }}
        />
        <input
          type="checkbox"
          name="green"
          id="green"
          checked={green}
          value={"green"}
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.name });
          }}
        />
        <input
          type="checkbox"
          name="purple"
          id="purple"
          checked={purple}
          value={"purple"}
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.name });
          }}
        />
      </div>
      <div className="phase_checkboxes">
        {checkData.docs.map((item, index) => (
          <label htmlFor={item.docName} key={Math.random()}>
            <Checkbox
              name={item.docName}
              checked={item.chk}
              value={item.chk.toString()}
              onChange={(e) => handleChange(e)}
            />
            {item.docName}
          </label>
        ))}

        <Button
          style={{
            width: "70%",
            height: "2rem",
            marginTop: "10px",
          }}
          type="rounded-outline"
          btnColor="#1890ff"
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default CheckboxArr;

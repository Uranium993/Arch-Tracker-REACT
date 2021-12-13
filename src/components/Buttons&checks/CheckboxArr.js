//Prevent rerenders on accordion click!!!
import React, { useState } from "react";
import Button from "../Buttons&checks/Button";
import { useMutation, useQueryClient } from "react-query";
import { updatePhase } from "../../actions/queryProjects";
import Checkbox from "../Buttons&checks/Checkbox";

function CheckboxArr({ docs, id, projectID, name }) {
  const queryClient = useQueryClient();

  const [checkData, setcheckData] = useState({
    projectID: projectID,
    name: name,
    color: "",
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

  //Horizontal color checks
  const [checkColors, setCheckColors] = useState({
    gray: false,
    blue: false,
    orange: false,
    green: false,
    purple: false,
  });

  const { gray, blue, orange, green, red } = checkColors;

  const loopKeys = (e) => {
    e.preventDefault();
    let newColorsObj;

    for (let keys in checkColors) {
      newColorsObj = checkColors[keys] = e.target.name === keys.toString();
    }

    setCheckColors({
      ...checkColors,
      newColorsObj,
    });
  };

  const mutation = useMutation((data) => updatePhase(data, projectID, id), {
    onSuccess: async (data, values) => {
      queryClient.setQueryData(["projectPhases", projectID], data);
      // queryClient.invalidateQueries(["project", projectID]);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(checkData);
  };

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
          value="gray"
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.value });
          }}
        />
        <input
          type="checkbox"
          name="blue"
          id="blue"
          checked={blue}
          value="#1890ff"
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.value });
          }}
        />
        <input
          type="checkbox"
          name="orange"
          id="orange"
          checked={orange}
          value="#F2C94C"
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.value });
          }}
        />
        <input
          type="checkbox"
          name="green"
          id="green"
          checked={green}
          value={"#00e674"}
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.value });
          }}
        />
        <input
          type="checkbox"
          name="red"
          id="purple"
          checked={red}
          value="#E74C3C"
          onInput={(e) => loopKeys(e)}
          onChange={(e) => {
            setcheckData({ ...checkData, color: e.target.value });
          }}
        />
      </div>
      <div className="phase_checkboxes">
        {checkData.docs.map((item, index) => (
          <label htmlFor={item.docName} key={Math.random()}>
            <Checkbox
              type="checkbox"
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

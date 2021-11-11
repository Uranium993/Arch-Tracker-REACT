import React, { useContext } from "react";
import { UserContext } from "../../actions/UserContext";

function AppBar() {
  const { value, setValue } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("editorName");
    setValue({ ...value, editor: false });
  };
  return (
    <div>
      <h4 style={{ color: "white" }}>Signed in as {value.userName} </h4>

      <ul>
        <li>
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AppBar;

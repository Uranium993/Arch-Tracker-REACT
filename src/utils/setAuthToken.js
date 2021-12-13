import api from "./api";

export const setAuthToken = (token, editorName, role) => {
  const tokenBearer = `${role}Token`;

  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;

    localStorage.setItem(tokenBearer, token);

    if (role === "editor") {
      localStorage.setItem("editorName", editorName);
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminToken");
    } else {
      localStorage.setItem("adminName", editorName);
      localStorage.removeItem("editorName");
      localStorage.removeItem("editorToken");
    }
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem(tokenBearer);
  }
};

export const checkAdmin = async () => {
  const res = await api.get("/auth");
  return res.data;
};

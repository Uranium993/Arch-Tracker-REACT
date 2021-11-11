import api from "./api";

export const setAuthToken = (token, editorName) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
    localStorage.setItem("editorName", editorName);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export const checkAdmin = async () => {
  const res = await api.get("/auth");

  return res;
};

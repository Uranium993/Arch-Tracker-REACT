import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
import { useMutation } from "react-query";

export const loadUser = async () => {};

export const registerEditor = async (data) => {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   };

  const { name, email, password, role } = data;

  const body = JSON.stringify({ name, email, password, role });

  try {
    const res = await api.post("/users", body);
  } catch (err) {
    console.log(err);
  }
};

export const login = async ({ email, password }) => {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   };

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post("/auth", body);

    setAuthToken(res.data.token);
  } catch (err) {
    const error = err.response.statusText;

    console.log(error);
  }
};

import api from "../utils/api";

export const addProject = async (data) => {
  const dataToString = JSON.stringify(data);

  try {
    const res = await api.post("/projects", dataToString);

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getProjects = async () => {
  try {
    const res = await api.get("/projects");

    return res.data;
  } catch (err) {
    console.log(err.response);
  }
};

export const getSingleProject = async (id) => {
  try {
    const res = await api.get(`/projects/${id}`);

    return res.data[0].phases;
  } catch (err) {
    console.log(err.response);
  }
};

export const editProjectInfo = async (data, id) => {
  try {
    const res = await api.patch(`/projects/${id}`, data);

    return res.data;
  } catch (err) {
    console.log(err.response);
  }
};

export const updatePhase = async (data, projectID, phaseID) => {
  try {
    const res = await api.patch(`/projects/${projectID}/${phaseID}`, data);

    console.log(res.data);
  } catch (err) {
    console.log(err.response);
  }
};

export const archiveProject = async (id) => {
  try {
    const res = await api.patch(`/projects/${id}`);

    console.log(res.data);
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await api.delete(`/projects/${id}`);

    console.log(res.data);
  } catch (err) {
    console.log(err.response);
  }
};

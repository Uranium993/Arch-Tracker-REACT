import { useQuery } from "react-query";
import { getProjects, getArchivedProjects } from "./queryProjects";

export const useProjects = () => {
  return useQuery("projects", () => getProjects(), {
    refetchOnWindowFocus: false,
    staleTime: 5000 * 60,
  });
};

export const useArchivedProjects = (menuKey) => {
  return useQuery(
    ["archivedProjects", menuKey],
    () => getArchivedProjects(menuKey),
    {
      refetchOnWindowFocus: false,
    }
  );
};

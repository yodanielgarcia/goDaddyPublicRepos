import axios from "axios";
import { EXTERNAL_ROUTES } from "../constants/EbackendRoutes";
import type { Repo } from "../types/IListItems";

export const getRepos = async (): Promise<Repo[]> => {

  const url = EXTERNAL_ROUTES.GET_REPOS;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch repositories.";
      console.error("Axios error:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while fetching the repositories."
      );
    }
  }
};

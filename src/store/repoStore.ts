import { create } from "zustand";
import { getRepos } from "../api/getRepos";
import type { RepoStoreState } from "../types/IRepoStore";

export const useRepoStore = create<RepoStoreState>((set) => ({
  repos: [],
  setRepos: (repos) => set({ repos }),
  fetchRepos: async () => {
    try {
      const repos = await getRepos();
      set({ repos });
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  },
}));
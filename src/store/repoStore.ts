import { create } from "zustand";
import { getRepos } from "../api/getRepos";
import type { Repo } from "../types/IListItems";


interface RepoStoreState {
  repos: Repo[];
  setRepos: (repos: Repo[]) => void;
  fetchRepos: () => Promise<void>;
}

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
import type { Repo } from "./IListItems";

export interface RepoStoreState {
  repos: Repo[];
  setRepos: (repos: Repo[]) => void;
  fetchRepos: () => Promise<void>;
}
export interface RepoOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface RepoLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: RepoOwner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: RepoLicense | null;
  archived: boolean;
  disabled: boolean;
  topics: string[];
  default_branch: string;
}
export interface RepoListItemProps {
  repo: Repo;
}

export interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

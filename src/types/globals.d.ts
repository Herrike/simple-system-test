// super basic user type from GitHub

export type User = {
  [key: string]: unknown;
  id: number | string;
  login: string;
};

// this is a shallow representation of
export type Repo = {
  [key: string]: unknown;
  id: number | string;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
};

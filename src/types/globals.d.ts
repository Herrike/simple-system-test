// super basic user type from GitHub

export type User = {
  [key: string]: unknown;
  id: number | string;
  name: string;
};

export type Repo = {
  [key: string]: unknown;
  id: number | string;
  name: string;
  userId: string;
};

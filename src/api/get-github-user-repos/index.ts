import useSWR from "swr";
import octokit from "../octokit-config";
import { Repo } from "../../types/globals";

const getGitHubUserRepos = async (userName: string, limit = 5) => {
  console.log(userName);
  const res = await octokit.request(`GET /users/${userName}/repos`, {
    per_page: limit,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (res.status !== 200) {
    console.error("Failed to fetch");
  }

  return res;
};

export const useUserRepos = (userName: string = "") => {
  const { data, error, isLoading } = useSWR(userName, getGitHubUserRepos, {
    refreshInterval: 60000,
  });

  if (!userName) {
    console.error("missing username");
    return;
  }

  if (error) {
    return {
      data: undefined,
      error: new Error(error),
      isLoading,
    };
  }

  const results = data?.data.items as Repo[];

  return {
    data: results,
    error,
    isLoading,
  };
};

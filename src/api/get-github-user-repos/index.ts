import useSWR from "swr";
import octokit from "../octokit-config";
import { Repo } from "../../types/globals.d";

const getGitHubUserRepos = async (userRepos: string, limit = 100) => {
  const username = userRepos.replace("/repos", "");
  const res = await octokit.request(`GET /users/${userRepos}`, {
    username,
    per_page: limit,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (res.status !== 200) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res;
};

export const useUserRepos = (userName: string = "") => {
  const { data, error, isLoading } = useSWR(
    `${userName}/repos`,
    getGitHubUserRepos,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (!userName) {
    return;
  }

  if (error) {
    return {
      data: undefined,
      error: new Error(error),
      isLoading,
    };
  }

  const results = data?.data as Repo[];

  return {
    data: results,
    error,
    isLoading,
  };
};

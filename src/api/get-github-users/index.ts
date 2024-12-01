import useSWR from "swr";
import octokit from "../octokit-config";
import { User } from "../../types/globals";

const getGitHubUsers = async (querySearch: string) => {
  const res = await octokit.request("GET /search/users", {
    q: querySearch,
    per_page: 5,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (res.status !== 200) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res;
};

export const useUsers = (querySearch: string = "") => {
  const { data, error, isLoading } = useSWR(querySearch, getGitHubUsers, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!querySearch) {
    return;
  }

  if (error) {
    return {
      data: undefined,
      error: new Error(error),
      isLoading,
    };
  }

  const results = data?.data.items as User[];

  return {
    data: results,
    error,
    isLoading,
  };
};

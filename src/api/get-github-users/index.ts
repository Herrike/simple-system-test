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
    console.error("Failed to fetch");
  }

  return res;
};

export const useUsers = (querySearch: string = "") => {
  const { data, error, isLoading } = useSWR(querySearch, getGitHubUsers);

  if (!querySearch) {
    console.error("missing query search");
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

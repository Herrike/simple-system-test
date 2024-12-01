import { type FC } from "react";

import { useUserRepos } from "../../api/get-github-user-repos";
import UserRepoResultList from "../user-repo-result-list";
import { Typography } from "@mui/material";

type UserRepoResultsProps = {
  userName: string;
};

const UserRepoResults: FC<UserRepoResultsProps> = ({ userName }) => {
  const userRepoResults = useUserRepos(userName);

  if (userRepoResults?.isLoading) {
    return (
      <Typography variant="body2" data-testid="results-loading">
        Loading results
      </Typography>
    );
  }

  if (userRepoResults?.error instanceof Error) {
    return (
      <Typography variant="body2" data-testid="results-error">
        An error occurred
      </Typography>
    );
  }
  const userRepos = userRepoResults?.data;

  return (
    <>
      {userRepos ? (
        <>
          {userRepos.length ? (
            <UserRepoResultList repos={userRepos} />
          ) : (
            <Typography variant="body2" data-testid={"no-user-repos"}>
              {userName} has no public repositories
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="body2" data-testid={"no-user-repos"}>
          no public repositories available
        </Typography>
      )}
    </>
  );
};

export default UserRepoResults;

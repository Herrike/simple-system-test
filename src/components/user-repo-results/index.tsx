import { type FC } from "react";

import { useUserRepos } from "../../api/get-github-user-repos";
import UserRepoResultList from "../user-repo-result-list";
import { Box, Typography } from "@mui/material";

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
      {userRepos && userRepos.length > 0 ? (
        <UserRepoResultList repos={userRepos} />
      ) : (
        <Box
          data-testid={"no-user-repos"}
          sx={{
            width: "100%",
            position: "relative",
            margin: "0.5rem 0 0.4rem 0",
            padding: "0.5rem 0.75rem",
            paddingRight: "0",
            backgroundColor: "var(--grey-300)",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.75rem",
              textAlign: "left",
              overflowWrap: "break-word",
            }}
          >
            {userName} has no public repositories
          </Typography>
        </Box>
      )}
    </>
  );
};

export default UserRepoResults;

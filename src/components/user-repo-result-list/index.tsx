import { FC } from "react";
import { Repo } from "../../types/globals.d";
import Repository from "../repository";
import { Box } from "@mui/material";

type UserResultListProps = {
  repos: Repo[];
};
const UserRepoResultList: FC<UserResultListProps> = ({ repos }) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "180px",
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: ".5rem",
        marginBottom: ".25rem",
      }}
    >
      {repos.map((repo) => {
        return (
          <Box
            key={repo.id}
            sx={{
              backgroundColor: "var(--grey-200)",
            }}
          >
            <Repository repo={repo} />
          </Box>
        );
      })}
    </Box>
  );
};

export default UserRepoResultList;

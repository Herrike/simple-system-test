import { FC } from "react";
import { Repo } from "../../types/globals.d";
import Repository from "../repository";
import { Container } from "@mui/material";

type UserResultListProps = {
  repos: Repo[];
};
const UserRepoResultList: FC<UserResultListProps> = ({ repos }) => {
  return (
    <Container
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "180px",
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      {repos.map((repo) => {
        return <Repository key={repo.id} repo={repo} />;
      })}
    </Container>
  );
};

export default UserRepoResultList;

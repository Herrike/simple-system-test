import { FC } from "react";
import { Repo } from "../../types/globals.d";
import Container from "@mui/material/Container";

type RepositoryProps = {
  repo: Repo;
};
const Repository: FC<RepositoryProps> = ({
  repo: { name, description, stargazers_count },
}) => {
  return (
    <Container
      sx={{
        position: "relative",
      }}
    >
      <div>
        <ul>
          <li>*</li>
          <li>{stargazers_count}</li>
        </ul>
      </div>
      <h3>{name}</h3>
      <p>{description ?? "no description"}</p>
    </Container>
  );
};

export default Repository;

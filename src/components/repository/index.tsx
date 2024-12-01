import { FC } from "react";
import { Repo } from "../../types/globals.d";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import RepositoryStars from "../repository-stars";

type RepositoryProps = {
  repo: Repo;
};
const Repository: FC<RepositoryProps> = ({
  repo: { name, description, stargazers_count },
}) => {
  return (
    <Box
      sx={{
        width: "80%",
        position: "relative",
        padding: "0.5rem 0.75rem",
        paddingRight: "0",
        boxSizing: "border-box",
        marginBottom: "0.5rem",
      }}
    >
      <RepositoryStars repoStars={stargazers_count} />
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          fontSize: "0.75rem",
          textAlign: "left",
          overflowWrap: "break-word",
          fontWeight: "bold",
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          fontSize: "0.75rem",
          textAlign: "left",
          overflowWrap: "break-word",
        }}
      >
        {description ?? "no description"}
      </Typography>
    </Box>
  );
};

export default Repository;

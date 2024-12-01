import { FC } from "react";
import { Repo } from "../../types/globals.d";
import Container from "@mui/material/Container";
import StarIcon from "@mui/icons-material/Star";
import { List, ListItemIcon, ListItemText, Typography } from "@mui/material";

type RepositoryProps = {
  repo: Repo;
};
const Repository: FC<RepositoryProps> = ({
  repo: { name, description, stargazers_count },
}) => {
  return (
    <Container
      sx={{
        width: "100%",
        position: "relative",
        paddingLeft: "0",
        paddingRight: "0",
        backgroundColor: "var(--grey-300)",
      }}
    >
      <List
        sx={{
          position: "absolute",
          top: 0,
          right: "10px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
          }}
        >
          <ListItemText
            sx={{
              fontSize: "0.75rem",
              margin: 0,
            }}
          >
            {stargazers_count}
          </ListItemText>
          <StarIcon
            sx={{
              fontSize: "1rem",
              marginLeft: "0.25rem",
            }}
          />
        </ListItemIcon>
      </List>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          textAlign: "left",
          overflowWrap: "break-word",
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          textAlign: "left",
          overflowWrap: "break-word",
        }}
      >
        {description ?? "no description"}
      </Typography>
    </Container>
  );
};

export default Repository;

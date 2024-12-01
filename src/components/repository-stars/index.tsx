import StarIcon from "@mui/icons-material/Star";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

type RepositoryStarProps = {
  repoStars: number;
};
const RepositoryStars: FC<RepositoryStarProps> = ({ repoStars }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "5px",
        right: "-20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: ".75rem",
        }}
      >
        {repoStars}
      </Typography>
      <StarIcon
        sx={{
          fontSize: ".75rem",
          fontWeight: "bold",
          marginLeft: "2px",
          lineHeight: "1rem",
        }}
      />
    </Box>
  );
};

export default RepositoryStars;

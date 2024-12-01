import { type FC } from "react";
import { Card as CardMUI, CardContent as CardContentMUI } from "@mui/material";
import UserResults from "../user-results";
import SearchForm from "../search-form";

const Card: FC = () => {
  return (
    <CardMUI>
      <CardContentMUI
        sx={{
          minHeight: "480px",
        }}
      >
        <SearchForm />
        <UserResults />
      </CardContentMUI>
    </CardMUI>
  );
};

export default Card;

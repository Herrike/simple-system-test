import { type FC } from "react";
import { Card as CardMUI, CardContent as CardContentMUI } from "@mui/material";
import UserResults from "../user-results";
import SearchForm from "../search-form";

const Card: FC = () => {
  return (
    <CardMUI
      sx={{
        minHeight: "480px",
        minWidth: "320px",
        maxWidth: "480px",
        borderRadius: "0",
        boxShadow: "none",
      }}
    >
      <CardContentMUI>
        <SearchForm />
        <UserResults />
      </CardContentMUI>
    </CardMUI>
  );
};

export default Card;

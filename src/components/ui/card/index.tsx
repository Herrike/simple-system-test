import { ChangeEventHandler, useState, type FC } from "react";
import SearchInput from "../search-input";
import SearchButton from "../search-button";
import {
  Card as CardMUI,
  CardContent as CardContentMUI,
} from "@mui/material";

const Card: FC = () => {
  const [querySearch, setQuerySearch] = useState("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const newQuerySearch = event.target.value;
    event.preventDefault();
    if (newQuerySearch != querySearch) {
      setQuerySearch(newQuerySearch);
    }
  };

  return (
    <CardMUI>
      <CardContentMUI
        sx={{
          minHeight: "480px",
        }}
      >
        <SearchInput
          id="outlined-basic"
          variant="outlined"
          placeholder="Enter username"
          fullWidth
          size="small"
          onChange={handleChange}
          sx={{
            marginBottom: "1rem",
          }}
        />
        <SearchButton variant="contained" fullWidth />
      </CardContentMUI>
    </CardMUI>
  );
};

export default Card;

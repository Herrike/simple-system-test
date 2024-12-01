import MUIButton, { ButtonProps } from "@mui/material/Button";
import { type FC } from "react";

const SearchButton: FC<ButtonProps> = (props) => {
  return (
    <MUIButton
      {...props}
      sx={{
        textTransform: "capitalize",
      }}
    >
      Search
    </MUIButton>
  );
};

export default SearchButton;

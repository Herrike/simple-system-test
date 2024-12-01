import MUIButton, { ButtonProps } from "@mui/material/Button";
import { type FC } from "react";

const SearchButton: FC<ButtonProps> = (props) => {
  return (
    <MUIButton
      {...props}
      sx={{
        textTransform: "capitalize",
        backgroundColor: "var(--blue-200)",
      }}
    >
      Search
    </MUIButton>
  );
};

export default SearchButton;

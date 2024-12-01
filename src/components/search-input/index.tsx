import TextFieldMUI, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

const SearchInput = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  return (
    <TextFieldMUI
      ref={ref}
      {...props}
      sx={{
        backgroundColor: "var(--grey-100)",
        marginBottom: "1rem",
      }}
    />
  );
});

export default SearchInput;

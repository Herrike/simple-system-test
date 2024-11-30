import TextFieldMUI, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

const SearchInput = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  return <TextFieldMUI ref={ref} {...props} />;
});

export default SearchInput;

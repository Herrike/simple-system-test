import TextFieldMUI, { TextFieldProps } from "@mui/material/TextField";
import { type FC } from "react";

const SearchInput: FC<TextFieldProps> = (props) => {
  return <TextFieldMUI {...props} />;
};

export default SearchInput;

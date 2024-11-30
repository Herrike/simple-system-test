import { FormEventHandler, useRef, type FC } from "react";
import SearchInput from "../search-input";
import SearchButton from "../search-button";
import { useQuerySearchAtom } from "../../../store/atoms/query-search-atom";

const SearchForm: FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [querySearch, setQuerySearch] = useQuerySearchAtom();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // we search for the input contained within the TextField MUI component
    const newQuerySearch =
      searchInputRef.current?.querySelector("input")?.value ?? "";

    if (newQuerySearch != querySearch) {
      setQuerySearch(newQuerySearch);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        ref={searchInputRef}
        variant="outlined"
        placeholder="Enter username"
        fullWidth
        size="small"
        sx={{
          marginBottom: "1rem",
        }}
      />
      <SearchButton variant="contained" fullWidth type="submit" />
    </form>
  );
};

export default SearchForm;

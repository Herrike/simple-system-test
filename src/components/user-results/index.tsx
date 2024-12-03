import { type FC } from "react";
import { useUsers } from "../../api/get-github-users";
import ResultList from "../user-result-list";

import { useQuerySearchAtom } from "../../store/atoms/query-search-atom";
import { Typography } from "@mui/material";

const UserResults: FC = () => {
  const [querySearch] = useQuerySearchAtom();
  const userResults = useUsers(querySearch);

  if (!querySearch) {
    return <></>;
  }

  if (userResults?.isLoading) {
    <Typography
      variant="body2"
      sx={{
        overflowWrap: "break-word",
      }}
    >
      Loading users for "{querySearch}"
    </Typography>;
  }

  if (userResults?.error) {
    return (
      <Typography variant="body2" data-testid="results-error">
        An error occurred
      </Typography>
    );
  }

  const users = userResults?.data;

  return (
    <>
      <div data-testid="results-data">
        <Typography
          variant="body2"
          sx={{
            overflowWrap: "break-word",
            margin: "0.75rem 0",
          }}
        >
          Showing users for "{querySearch}"
        </Typography>
      </div>
      {users && users.length ? (
        <ResultList users={users} />
      ) : (
        <Typography variant="body2" data-testid="no-user-found">
          No user found
        </Typography>
      )}
    </>
  );
};

export default UserResults;

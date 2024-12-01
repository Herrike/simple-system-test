import { type FC } from "react";
import { useUsers } from "../../api/get-github-users";
import ResultList from "../user-result-list";

import { useQuerySearchAtom } from "../../store/atoms/query-search-atom";

const UserResults: FC = () => {
  const [querySearch] = useQuerySearchAtom();
  const userResults = useUsers(querySearch);

  if (!querySearch) {
    return <></>;
  }

  if (userResults?.isLoading) {
    <p>Loading users for "{querySearch}"</p>;
  }

  if (userResults?.error instanceof Error) {
    return <p data-testid="results-error">An error occurred</p>;
  }

  const users = userResults?.data;

  return (
    <>
      <div data-testid="results-data">
        <p>Showing users for "{querySearch}"</p>
      </div>
      {users && users.length ? (
        <ResultList users={users} />
      ) : (
        <p data-testid="no-user-found">No user found</p>
      )}
    </>
  );
};

export default UserResults;

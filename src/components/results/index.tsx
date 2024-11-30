import { type FC } from "react";
import { useUsers } from "../../api/get-github-users";
import ResultList from "../ui/result-list";
import { useUsersAtom } from "../../store/atoms/users-atom";
import { useQuerySearchAtom } from "../../store/atoms/query-search-atom";

const Results: FC = () => {
  const [querySearch] = useQuerySearchAtom();
  const [users, setUsers] = useUsersAtom();
  const userResults = useUsers(querySearch);

  if (
    userResults &&
    Array.isArray(userResults?.data) &&
    !!userResults?.data.length
  ) {
    setUsers(userResults.data);
  }

  if (!querySearch || !users) {
    return <></>;
  }

  if (userResults?.error) {
    return <p data-testid="results-error">An error occurred</p>;
  }
  console.log("result users:", users);

  return (
    <>
      <div data-testid="results-data">
        <p>Showing users for "{querySearch}"</p>
      </div>
      {users && !!users.length && <ResultList users={users} />}
    </>
  );
};

export default Results;

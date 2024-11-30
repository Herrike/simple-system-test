import { type FC } from "react";
import { useUsers } from "../../api/get-github-users";
import ResultList from "../ui/result-list";

type ResultsProps = {
  querySearch: string;
};
const Results: FC<ResultsProps> = ({ querySearch = "" }) => {
  const results = useUsers();

  if (!querySearch) {
    return <></>;
  }

  if (results?.isLoading) {
    return <p data-testid="results-loading">Loading results</p>;
  }

  if (results?.error) {
    return <p data-testid="results-error">An error occurred</p>;
  }

  return (
    <>
      <div data-testid="results-data">
        <p>
          <strong>{querySearch}</strong>
        </p>
      </div>
      <div>
        <ResultList users={[]} usersRepos={[]} />
      </div>
    </>
  );
};

export default Results;

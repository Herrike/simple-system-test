import { FC } from "react";
import { type User, type Repo } from "../../../types/globals";

type ResultListProps = {
  users: User[];
  usersRepos: Repo[];
};
const ResultList: FC<ResultListProps> = ({ users, usersRepos }) => {
  console.log(users);
  console.log(usersRepos);
  return <div>ResultList</div>;
};

export default ResultList;

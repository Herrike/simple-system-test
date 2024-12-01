import { FC } from "react";
import { Repo } from "../../types/globals.d";
import Repository from "../repository";

type UserResultListProps = {
  repos: Repo[];
};
const UserRepoResultList: FC<UserResultListProps> = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => {
        return <Repository key={repo.id} repo={repo} />;
      })}
    </div>
  );
};

export default UserRepoResultList;

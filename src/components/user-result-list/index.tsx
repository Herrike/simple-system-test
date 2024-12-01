import { FC } from "react";
import { type User } from "../../types/globals";
import UserRepoResults from "../user-repo-results";

type UserResultListProps = {
  users: User[];
};
const UserResultList: FC<UserResultListProps> = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => {
        const panelName = `panel${index}`;
        const userName = user.login;
        return (
          <UserRepoResults
            key={user.id}
            panelName={panelName}
            userName={userName}
          />
        );
      })}
    </div>
  );
};

export default UserResultList;

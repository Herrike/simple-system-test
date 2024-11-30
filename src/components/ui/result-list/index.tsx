import { FC } from "react";
import { type User } from "../../../types/globals.d";
import Accordion from "../accordion";

type ResultListProps = {
  users: User[];
};
const ResultList: FC<ResultListProps> = ({ users }) => {
  console.log("user repo");
  return (
    <div>
      {users.map((user, index) => {
        const panelName = `panel${index}`;
        const userName = user.login;
        return (
          <Accordion panelName={panelName} userName={userName}></Accordion>
        );
      })}
    </div>
  );
};

export default ResultList;

import { FC, SyntheticEvent, useState } from "react";
import { Accordion as AccordionMUI } from "@mui/material";
import {
  AccordionSummary as AccordionSummaryMUI,
  AccordionDetails as AccordionDetailsMUI,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type User } from "../../types/globals.d";
import UserRepoResults from "../user-repo-results";

type UserResultListProps = {
  users: User[];
};
const UserResultList: FC<UserResultListProps> = ({ users }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {users.map((user, index) => {
        const panelName = `panel${index}`;
        const userName = user.login;
        return (
          <AccordionMUI
            key={user.id}
            expanded={expanded === panelName}
            onChange={handleChange(panelName)}
            sx={{
              boxShadow: "none",
              border: "none",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <AccordionSummaryMUI
              data-testid={`${panelName}-header`}
              sx={{
                minHeight: "32px",
                backgroundColor: "var(--grey-100)",
                "& > div": {
                  margin: "0",
                },
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${panelName}-content`}
              id={`${panelName}-header`}
            >
              {userName}
            </AccordionSummaryMUI>
            <AccordionDetailsMUI
              data-testid={`${panelName}-content`}
              sx={{
                padding: 0,
              }}
            >
              <UserRepoResults key={user.id} userName={userName} />
            </AccordionDetailsMUI>
          </AccordionMUI>
        );
      })}
    </div>
  );
};

export default UserResultList;

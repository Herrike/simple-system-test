import { type FC } from "react";

import { Accordion as AccordionMUI } from "@mui/material";
import {
  AccordionSummary as AccordionSummaryMUI,
  AccordionDetails as AccordionDetailsMUI,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUserRepos } from "../../api/get-github-user-repos";
import UserRepoResultList from "../user-repo-result-list";

type UserRepoResultsProps = {
  panelName: string;
  userName: string;
};

const UserRepoResults: FC<UserRepoResultsProps> = ({ userName, panelName }) => {
  const userRepoResults = useUserRepos(userName);

  if (userRepoResults?.isLoading) {
    return <p data-testid="results-loading">Loading results</p>;
  }

  if (userRepoResults?.error instanceof Error) {
    return <p data-testid="results-error">An error occurred</p>;
  }
  const userRepos = userRepoResults?.data;
  console.log("result user repos:", userRepos);

  return (
    <AccordionMUI>
      <AccordionSummaryMUI
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelName}-content`}
        id={`${panelName}-header`}
      >
        {userName}
      </AccordionSummaryMUI>
      <AccordionDetailsMUI>
        {userRepos && userRepos.length ? (
          <UserRepoResultList repos={userRepos} />
        ) : (
          <p data-testid={"no-user-repos"}>
            {userName} has no public repositories
          </p>
        )}
      </AccordionDetailsMUI>
    </AccordionMUI>
  );
};

export default UserRepoResults;

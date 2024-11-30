import { type FC } from "react";

import { Accordion as AccordionMUI } from "@mui/material";
import {
  AccordionSummary as AccordionSummaryMUI,
  AccordionDetails as AccordionDetailsMUI,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUserReposAtom } from "../../../store/atoms/users-repos-atom";
import { useUserRepos } from "../../../api/get-github-user-repos";

type AccordionProps = {
  panelName: string;
  userName: string;
};

const Accordion: FC<AccordionProps> = ({ userName, panelName }) => {
  const [userRepos, setUserRepos] = useUserReposAtom();
  const userReposResults = useUserRepos(userName);

  if (
    userReposResults?.data &&
    Array.isArray(userReposResults?.data) &&
    !!userReposResults?.data.length
  ) {
    console.log("saved users");
    setUserRepos(userReposResults.data);
  }

  if (!userName || !userRepos) {
    return <></>;
  }

  if (userReposResults?.isLoading) {
    return <p data-testid="results-loading">Loading results</p>;
  }

  if (userReposResults?.error) {
    return <p data-testid="results-error">An error occurred</p>;
  }
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
      <AccordionDetailsMUI>{userName}'s repos</AccordionDetailsMUI>
    </AccordionMUI>
  );
};

export default Accordion;

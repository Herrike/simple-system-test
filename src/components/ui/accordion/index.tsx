import { type FC } from "react";

import {
  Accordion as AccordionMUI,
  AccordionSummary as AccordionSummaryMUI,
  AccordionDetails as AccordionDetailsMUI,
} from "@mui/material";

type AccordionProps = {
  name: string;
};
const Accordion: FC<AccordionProps> = ({ name }) => {
  return (
    <AccordionMUI>
      <AccordionSummaryMUI>{name}</AccordionSummaryMUI>
      <AccordionDetailsMUI>{name}'s repos</AccordionDetailsMUI>
    </AccordionMUI>
  );
};

export default Accordion;

import React, { useCallback } from "react";
import style from "styled-components";

export const TableRow = style.tr`
  cursor: pointer;
  :nth-child(even){
    background-color: #f2f2f2;
  }
  :hover {
    background-color: #ddd;
  }
`;

export const TableData = style.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

//show rows in Continent List
const ContinentListRow = ({ name, code, onContinentClick }) => {
  // handle row click and passing continent code to the parent
  const handleClick = useCallback(() => onContinentClick(code), [
    onContinentClick,
    code
  ]);
  return (
    <TableRow onClick={handleClick}>
      <TableData>{code}</TableData>
      <TableData>{name}</TableData>
    </TableRow>
  );
};

export default ContinentListRow;

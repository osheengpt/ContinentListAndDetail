import React, { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import style from "styled-components";
import ContinentListRow from "./ContinentListRow";

const GET_CONTINENTS = gql`
  query continents {
    continents {
      code
      name
    }
  }
`;

export const Title = style.h3`
  text-align: center;
  background: #8080808a;
  color: white;
  padding: 2px;
`;

export const Table = style.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHead = style.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #8080808a;
  color: white;
`;

export const LoadingData = style.td`
  font-size: 18px;
  font-weight: 600;
  padding: 20px;
  text-align: center;
  color: #00000070;
`;

//show the list of continents
const ContinentList = ({ history }) => {
  // to get list of continents
  const { data } = useQuery(GET_CONTINENTS);
  const continents = data && data.continents;
  // to change browser history to render continent detail and passing continent code in param
  const handleContinentClick = useCallback(
    code => {
      history.push(`/${code}`);
    },
    [history]
  );
  return (
    <>
      <Title>CONTINENT LIST</Title>
      <Table>
        <thead>
          <tr>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
          </tr>
        </thead>
        <tbody>
          {continents ? (
            continents.map(({ name, code }) => (
              <ContinentListRow
                key={code}
                name={name}
                code={code}
                onContinentClick={handleContinentClick}
              />
            ))
          ) : (
            <tr>
              <LoadingData colSpan="2">Loading...</LoadingData>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ContinentList;

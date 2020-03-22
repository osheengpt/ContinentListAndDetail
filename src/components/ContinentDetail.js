import React from "react";
import style from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Title, Table, TableHead, LoadingData } from "./ContinentList";
import { TableRow, TableData } from "./ContinentListRow";

const GET_CONTINENT_DETAIL = gql`
  query continent($code: String) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        currency
        phone
        native
      }
    }
  }
`;

const Details = style.h4`
  margin-left: 20px;
  color: #000000bf;
`;

const Caption = style.caption`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #000000a3
`;

//show Continent Detail
const ContinentDetail = () => {
  // to get continent code from params
  const { code } = useParams();
  // to get details of continent by its code value
  const { data } = useQuery(GET_CONTINENT_DETAIL, { variables: { code } });
  const continent = data && data.continent;
  const { name, countries } = continent || {};
  return (
    <>
      <Title>CONTINENT DETAIL</Title>
      {code && <Details>{`CODE:   ${code}`}</Details>}
      {name && <Details>{`NAME:   ${name}`}</Details>}
      <Table>
        <Caption>Countries</Caption>
        <thead>
          <tr>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Native</TableHead>
          </tr>
        </thead>
        <tbody>
          {countries ? (
            countries.map(({ name, code, currency, phone, native }) => (
              <TableRow key={code}>
                <TableData>{code}</TableData>
                <TableData>{name}</TableData>
                <TableData>{currency}</TableData>
                <TableData>{phone}</TableData>
                <TableData>{native}</TableData>
              </TableRow>
            ))
          ) : (
            <tr>
              <LoadingData colSpan="5">Loading...</LoadingData>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ContinentDetail;

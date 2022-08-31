import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { ILoanJSONArray, IPrepaymentJSON } from "../types";
import calculateLoanAmount from "../utils/calculateLoanAmount";
import CurrencyInput from "./CurrencyInput";

interface ILoanTableProps {
  principal: number;
  rates: number;
  tenure: number;
  prepaymentJSON: IPrepaymentJSON;
  setPrepaymentJSON: (value: IPrepaymentJSON) => void;
}

const LoanTable = ({
  principal,
  rates,
  tenure,
  prepaymentJSON,
  setPrepaymentJSON,
}: ILoanTableProps) => {
  const [loanData, setLoanData] = useState<ILoanJSONArray>([]);
  useEffect(() => {
    let newLoanData = calculateLoanAmount(
      principal,
      rates,
      tenure,
      prepaymentJSON
    );
    setLoanData(newLoanData);
  }, [principal, rates, tenure, prepaymentJSON]);

  return (
    <Box>
      <TableContainer background={"white"} padding={5} borderRadius={3}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Month</Th>
              <Th>Principal</Th>
              <Th>Interest</Th>
              <Th>EMI</Th>
              <Th>Prepayment</Th>
              <Th>Outstanding</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loanData.map((loan) => (
              <Tr key={loan.month}>
                <Td>{loan.month}</Td>
                <Td>₹ {loan.principal.toFixed(2)}</Td>
                <Td>₹ {loan.interest.toFixed(2)}</Td>
                <Td>₹ {loan.emi.toFixed(2)}</Td>
                <Td>
                  <CurrencyInput
                    value={prepaymentJSON[loan.month]}
                    onChange={(value) => {
                      let newJSON = { ...prepaymentJSON };
                      newJSON[loan.month] = value;
                      setPrepaymentJSON(newJSON);
                    }}
                  />
                </Td>
                <Td>₹ {loan.outstanding.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LoanTable;

import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Badge } from "@chakra-ui/react";

export default function Transactions({ payments }) {
    const successBadge = () => {
        return <Badge colorScheme="green">Success</Badge>;
    };

    const failureBadge = () => {
        return <Badge colorScheme="red">Failed</Badge>;
    };

    return (
        <Box border="1px solid" borderColor="gray.100" borderRadius="md">
            <Table colorScheme="gray" variant="striped">
                <Thead color="#303238">
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Currency</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {payments
                        ? payments.map((item, key) => {
                              return (
                                  <Tr key={key}>
                                      <Td>{item.metadata?.name}</Td>
                                      <Td>{item.metadata?.email}</Td>
                                      <Td>{item.currency?.toUpperCase()}</Td>
                                      <Td>{item.amount}</Td>
                                      <Td alignContent="center">
                                          {item.status == "succeeded"
                                              ? successBadge()
                                              : failureBadge()}
                                      </Td>
                                  </Tr>
                              );
                          })
                        : null}
                </Tbody>
            </Table>
        </Box>
    );
}

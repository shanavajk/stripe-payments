import React from "react";

import { Flex, Spacer, Heading, Button, Box } from "@chakra-ui/react";

const Header = (props) => {
    return (
        <Flex>
            <Box>
                <Heading>Transactions</Heading>
            </Box>
            <Spacer />
            <Box>
                <Button colorScheme="green" onClick={props.onOpen}>
                    Make Payment
                </Button>
            </Box>
        </Flex>
    );
};

export default Header;

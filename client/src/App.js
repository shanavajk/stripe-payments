import "./css/App.css";
import React, { useEffect, useState } from "react";
import { ChakraProvider, Container, useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";

import StripeContainer from "./components/StripeContainer";
import Transactions from "./components/Transactions";
import { listPayments } from "./services/stripe";

function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getPayments();
    }, []);

    const getPayments = async () => {
        const response = await listPayments();
        setPayments(response.data.payments);
    };

    return (
        <ChakraProvider>
            <Container size="xl" w="100%" maxWidth="1036px" padding={8}>
                <Header onOpen={onOpen} />
                <br />
                <Transactions payments={payments} />
                <StripeContainer getPayments={getPayments} isOpen={isOpen} onClose={onClose} />
            </Container>
        </ChakraProvider>
    );
}

export default App;

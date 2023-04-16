import React from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

export const PaymentFailed = ({ message }) => {
    return (
        <Alert status="error" variant="left-accent" mb="5px">
            <AlertIcon />
            <AlertTitle fontSize="sm">Payment Failed!</AlertTitle>
            <AlertDescription fontSize="sm" maxWidth="sm">
                {message}.
            </AlertDescription>
        </Alert>
    );
};

export const PaymentSuccess = ({ message }) => {
    return (
        <Alert status="success" variant="left-accent" mb="5px">
            <AlertIcon />
            <AlertDescription fontSize="sm" maxWidth="sm">
                {message}.
            </AlertDescription>
        </Alert>
    );
};

export const FormErrors = ({ message }) => {
    return (
        <Alert status="error" pb="0px" pt="0px" size="xs" variant="solid" mb="5px">
            <AlertDescription fontSize="sm" maxWidth="sm">
                {message}.
            </AlertDescription>
        </Alert>
    );
};

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_API_KEY;

const stripePomise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {
    const finalRef = React.useRef(null);
    return (
        <Modal finalFocusRef={finalRef} isOpen={props.isOpen} onClose={props.onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Make Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Elements stripe={stripePomise}>
                        <PaymentForm getPayments={props.getPayments} />
                    </Elements>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default StripeContainer;

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { act } from "react-dom/test-utils";
import PaymentForm from "../components/PaymentForm";

describe("Loads the payment form", () => {
    test("PaymentModal -> Payment works in test mode", async () => {
        // Mock Stripe API key
        const stripePromise = loadStripe("pk_test_123456789");

        // Mock the `createPaymentIntent` function to return a successful response
        const createPaymentIntent = jest.fn().mockResolvedValue({ clientSecret: "pi_123456789" });

        // Render the component
        const { getByLabelText } = render(
            <Elements stripe={stripePromise}>
                <PaymentForm createPaymentIntent={createPaymentIntent} />
            </Elements>
        );

        await waitFor(() => expect(screen.getByLabelText(/Name/i)));
    });
});

describe("PaymentForm", () => {
    test("makes a successful Stripe payment", async () => {
        // Mock Stripe API key
        const stripePromise = loadStripe("pk_test_123456789");

        // Mock the `createPaymentIntent` function to return a successful response
        const createPaymentIntent = jest.fn().mockResolvedValue({ clientSecret: "pi_123456789" });

        // Render the component
        const { getByLabelText, getByRole } = render(
            <Elements stripe={stripePromise}>
                <PaymentForm createPaymentIntent={createPaymentIntent} />
            </Elements>
        );

        // Fill out the form
        fireEvent.change(getByLabelText("Name"), { target: { value: "John Smith" } });
        fireEvent.change(getByLabelText("Email"), { target: { value: "john.smith@example.com" } });

        /**
         * NOTE : To do need to research how to get the card element details,these elements are getting loaded into iframe test library is not able to find these element possible solution to use cypress */

        /*  fireEvent.change(getByLabelText("Card Details"), { target: { value: "4242424242424242" } });
        fireEvent.change(getByLabelText("Expiration date"), { target: { value: "12/25" } });
        fireEvent.change(getByLabelText("CVC"), { target: { value: "123" } }); 

        // Click the submit button
        act(() => {
            fireEvent.click(getByRole("button", { name: "Pay" }));
        });

        // Wait for the payment to process
        await waitFor(() => expect(createPaymentIntent).toHaveBeenCalledTimes(1));

        // Check that the payment succeeded
        expect(createPaymentIntent).toHaveBeenCalledWith({
            amount: 1000,
            currency: "usd",
            name: "John Smith",
            email: "john.smith@example.com",
            payment_method: "pm_card_visa",
        });*/
    });
});

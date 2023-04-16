import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { listPayments } from "./services/stripe";
import App from "./App";
import { jest } from "@jest/globals";

jest.mock("./services/stripe"); // Mock the listPayments function

describe("App", () => {
    beforeEach(() => {
        // Mock the response of listPayments
        listPayments.mockResolvedValue({
            data: {
                payments: [
                    { id: 1, amount: 10 },
                    { id: 2, amount: 20 },
                ],
            },
        });
    });

    test("renders payments data correctly", async () => {
        render(
            <ChakraProvider>
                <App />
            </ChakraProvider>
        );

        // Wait for the payments data to be fetched and rendered
        await waitFor(() => {
            const payment1 = screen.getByText("Payment 1: $10");
            const payment2 = screen.getByText("Payment 2: $20");
            expect(payment1).toBeInTheDocument();
            expect(payment2).toBeInTheDocument();
        });
    });

    test("opens StripeContainer when header button is clicked", async () => {
        render(
            <ChakraProvider>
                <App />
            </ChakraProvider>
        );

        const openButton = screen.getByRole("button", { name: "Open Stripe Container" });
        expect(screen.queryByText("Stripe Container Content")).not.toBeInTheDocument();

        openButton.click();

        // Wait for the StripeContainer to be opened and rendered
        await waitFor(() => {
            const stripeContainerContent = screen.getByText("Stripe Container Content");
            expect(stripeContainerContent).toBeInTheDocument();
        });
    });

    // Add more test cases as needed for other scenarios or functionalities
});

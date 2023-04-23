import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Transactions from "../components/Transactions";
import { PaymentFailed, PaymentSuccess, FormErrors } from "../components/Alerts";

describe("Transactions component", () => {
    test("renders a message when there are no payments", () => {
        render(<Transactions />);
        expect(screen.getByText(/No payments found/i)).toBeInTheDocument();
    });

    test("renders a table with payment information when payments are passed as props", () => {
        const payments = [
            {
                id: "123",
                metadata: { name: "John Doe", email: "john@example.com" },
                currency: "usd",
                amount: 1000,
                status: "succeeded",
            },
            {
                id: "456",
                metadata: { name: "Jane Smith", email: "jane@example.com" },
                currency: "eur",
                amount: 500,
                status: "failed",
            },
        ];
        render(<Transactions payments={payments} />);
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/USD/i)).toBeInTheDocument();
        expect(screen.getByText(/1000/i)).toBeInTheDocument();
        expect(screen.getByText(/Success/i)).toBeInTheDocument();

        expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/EUR/i)).toBeInTheDocument();
        expect(screen.getByText(/500/i)).toBeInTheDocument();
        expect(screen.getByText(/Failed/i)).toBeInTheDocument();
    });
});

describe("PaymentFailed component", () => {
    test("renders a message with the provided error message", () => {
        render(<PaymentFailed message="Your payment failed." />);
        expect(screen.getByText(/Your payment failed./i)).toBeInTheDocument();
    });
});

describe("PaymentSuccess component", () => {
    test("renders a message with the provided success message", () => {
        render(<PaymentSuccess message="Your payment was successful." />);
        expect(screen.getByText(/Your payment was successful./i)).toBeInTheDocument();
    });
});

describe("FormErrors component", () => {
    test("renders a message with the provided error message", () => {
        render(<FormErrors message="Please fill in all required fields." />);
        expect(screen.getByText(/Please fill in all required fields./i)).toBeInTheDocument();
    });
});

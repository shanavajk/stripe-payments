import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentSuccess, PaymentFailed, FormErrors } from "./Alerts";
import { useForm } from "react-hook-form";

import { makePayment } from "../services/stripe";

const CARD_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,

    style: {
        base: {
            fontSize: "16px",
            color: "#424770",
            letterSpacing: "0.025em",
            fontSmoothing: "antialiased",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
                color: "#aab7c4",
            },
            padding: "4px",
        },
        invalid: {
            color: "#e5424d",
            ":focus": {
                color: "#303238",
            },
        },
    },
};

export default function PaymentForm({ getPayments }) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const stripe = useStripe();
    const elements = useElements();

    const onSubmit = async (data) => {
        //e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),

            billing_details: {
                name: data.name,
                email: data.email,
            },
        });
        if (!error) {
            const result = await makePayment(data, paymentMethod);
            setMessage(result.message);
            if (result.success) {
                setPaymentSuccess(true);
            } else {
                setPaymentFailed(true);
            }
            getPayments();
        } else {
            setMessage(error.message);
            setPaymentFailed(true);
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    Name
                    {errors.name?.type === "required" && <FormErrors message="Name is required" />}
                    {errors.name?.type === "minLength" && (
                        <FormErrors message="Name should be atleast 8 charactes long" />
                    )}
                    {errors.name?.type === "pattern" && (
                        <FormErrors message="Name should not any special characters and numbers" />
                    )}
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", {
                        required: true,
                        minLength: 8,
                        pattern: /^[A-Z a-z]+$/i,
                    })}
                />

                <label htmlFor="email">
                    Email
                    {errors.email?.type === "required" && (
                        <FormErrors message="Email is required" />
                    )}
                    {errors.email?.type === "minLength" && (
                        <FormErrors message="Email should be atleast 8 charactes long" />
                    )}
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", {
                        required: true,
                        minLength: 8,
                    })}
                />

                <label htmlFor="amount">
                    Amount
                    {errors.amount?.type === "required" && (
                        <FormErrors message="Amount is required" />
                    )}
                    {(errors.amount?.type === "validate" || errors.amount?.type === "pattern") && (
                        <FormErrors message="Please enter valid amount" />
                    )}
                </label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    {...register("amount", {
                        required: true,
                        valueAsNumber: true,
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                        validate: (value) => value > 0,
                    })}
                />
                <label htmlFor="card">Card Details</label>
                <CardElement name="card" id="card" options={CARD_OPTIONS} />

                <div className="text-center">
                    <Button colorScheme="green" type="submit">
                        Pay
                    </Button>
                </div>
                <br />
                {paymentSuccess ? <PaymentSuccess message={message} /> : ""}
                {paymentFailed ? <PaymentFailed message={message} /> : ""}
            </form>
        </div>
    );
}

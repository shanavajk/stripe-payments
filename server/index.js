const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//Payment Routes (Normally I create route file and read the parameters/ form data and pass it to Service (Model Code) where all business logic is handled. This ensures that controller are light and all my business logic is separated)

app.post("/api/payment", cors(), async (req, res, next) => {
    let { amount, id, email, name } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Subscription Charges",
            payment_method: id,
            confirm: true,
            metadata: {
                email,
                name,
                amount,
            },
        });

        res.json({
            message: "Payment Successfull",
            success: true,
            payment,
        });
    } catch (error) {
        res.json({
            message: "Payment Failed",
            success: false,
            error,
        });
    }
});

app.get("/api/payments", cors(), async (req, res, next) => {
    try {
        const payments = await stripe.paymentIntents.list();
        res.json({
            payments: payments.data,
            success: true,
        });
    } catch (error) {
        res.json({
            message: "List Transaction Failed",
            success: false,
            error,
        });
    }
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000");
});

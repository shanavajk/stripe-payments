import axios from "axios";

export const listPayments = async () => {
    const endpoint = process.env.REACT_APP_SERVER_URL + "/payments";
    const payments = await axios.get(endpoint);
    return payments;
};

export const makePayment = async (data, paymentMethod) => {
    try {
        const endpoint = process.env.REACT_APP_SERVER_URL + "/payment";
        const { id } = paymentMethod;
        const response = await axios.post(endpoint, {
            id,
            amount: data.amount,
            name: data.name,
            email: data.email,
        });

        return {
            success: response.data.success,
            message: response.data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

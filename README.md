# Stripe Payment App

This is a sample payment gateway integration full-stack web app. The app includes a client-side built with React and a server-side built with Node.js and Express & APIs for making payments to Stripe.

# Features

Payment APIs to Stripe (Creating & Listing Payments)
Client-side code to show and collect the payments
RESTful API using Express
Error handling and validation
Responsive UI with ChakraUI

# Installation

To run this app locally, follow these steps:
Clone the repository: git clone https://github.com/shanavajk/stripe-payments.git
Change directory to the cloned repository: cd stripe-payments
Change directory to the server-side: cd server
Install dependencies for the server-side: npm install
Change directory to the client-side: cd client
Install dependencies for the client-side: npm install
Go back to the root server directory: cd server && node index.js to start the server (Server PORT can be configured in .env file otherwise application will take default 4000 as port )

# Configuration

Get the secret key by Singing-Up on Stripe Official website, goto Dashboard to get the Secret Key and Publishable Key from API Key Menu

## Server-side configuration

Set up some environment variables. Create a .env file and add the Secret Key.

```
SECRET_KEY="<STRIPE_SECRET_KEY>
```

## Client-Side Configuration

```
REACT_APP_STRIPE_PUBLIC_API_KEY=<STRIPE_PUBLISHABLE_KEY>
REACT_APP_SERVER_URL="<SERVER_API_ENDPOINT>" (To make payment api calls)
```

# Usage

The Stripe Payments app consists of a client-side and a server-side.

## Client-side

The client-side of the app is built with React and includes components and views. You can modify and add new components and pages to build your own UI.

To start the client-side development server, run npm start in the client directory of the app.

## Server-side

The server-side of the app is built with Node.js and Express, and includes routes for Payments.

To start the server-side development server, run node index.js in the server directory of the app.

# Hosting

This app is hosted on vercel.com.

https://stripe-payments-client-shanavajk.vercel.app/

## Server-Side Hosting Configuration for deployment.

Create vercel.json and add the below json configuration.

```json
{
    "version": 2,
    "builds": [
        {
            "src": "*.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}
```

## Deployment Steps

Sign-Up on vercel.com using your GitHub creadentials.
From Overview tab you can select your repository from GitHub & Import.
On the deployment screen deploy the client and server folder separately & make sure you add the environment variable defined in your .env file.

Note:
For Server Deployment override the Build Command use node index.js instead of npm run build / start

# License

This MERN app is open-source and available under the MIT License.

# Contact

If you have any questions or suggestions, please feel free to contact me at shanavajkanakawad@gmail.com.

import React from 'react';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js';
import FormPayment from './FormPayment';


const stripePromise = loadStripe("pk_test_51KOVMtLrSuWC6PQ7K0ClYrLzaIH1shfeJM9GUiTOSYAf8roEwN24DD5EzeFrQEguuLpRREBz55bk0KfQRDdC6oRn00FoZDhsnt")

const StripeContainer = () => {

 return (
  <Elements stripe={stripePromise}>
       <FormPayment />
  </Elements>
 );
}

export default StripeContainer;

import * as React from "react";
import StripeInput from "./StripeInput";
import { TextField } from "@mui/material";

export const StripeTextField = (props) => {
  const {
    helperText,
    InputLabelProps,
    InputProps = {},
    inputProps,
    error,
    labelErrorMessage,
    stripeElement,
    ...other
  } = props;

  return (
    <TextField
      fullWidth
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      error={error}
      InputProps={{
        ...InputProps,
        inputProps: {
          ...inputProps,
          ...InputProps.inputProps,
          component: stripeElement,
        },
        inputComponent: StripeInput,
      }}
      helperText={error ? labelErrorMessage : helperText}
      {...other}
    />
  );
};

export function StripeTextFieldNumber(props) {
  return <StripeTextField label="Credit Card Number" {...props} />;
}
export function StripeTextFieldExpiry(props) {
  return <StripeTextField label="Expires" {...props} />;
}

export function StripeTextFieldCVC(props) {
  return <StripeTextField label="CVC Code" {...props} />;
}

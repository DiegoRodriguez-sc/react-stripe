import React from "react";

import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from "./CommonTextField";

const FormPayment = () => {
  const [state, setState] = React.useState({
    cardNumberComplete: false,
    expiredComplete: false,
    cvcComplete: false,
    cardNumberError: null,
    expiredError: null,
    cvcError: null,
  });

  const onElementChange =
    (field, errorField) =>
    ({ complete, error = { message: null } }) => {
      setState({ ...state, [field]: complete, [errorField]: error.message });
    };

  const { cardNumberError, expiredError, cvcError } = state;

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          md: { padding: 10 },
          width: { md: "70%", xs: "100%" },
          marginTop: 20,
        }}
      >
        <Typography variant="h3" align="center">
          React Stripe
        </Typography>
        <form>
            <StripeTextFieldNumber
              error={Boolean(cardNumberError)}
              fullWidth
              required
              labelErrorMessage={cardNumberError}
              onChange={onElementChange(
                "cardNumberComplete",
                "cardNumberError"
              )}
            />
          <Grid item xs={6} sm={3}>
            <StripeTextFieldExpiry
              error={Boolean(expiredError)}
              required
              labelErrorMessage={expiredError}
              onChange={onElementChange("expiredComplete", "expiredError")}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StripeTextFieldCVC
              error={Boolean(cvcError)}
              required
              labelErrorMessage={cvcError}
              onChange={onElementChange("cvcComplete", "cvcError")}
            />
          </Grid>
          <button>Submit</button>
        </form>
      </Box>
    </Container>
  );
};

export default FormPayment;

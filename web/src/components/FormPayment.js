import React, { useEffect, useState } from "react";

import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from "./CommonTextField";
import { fetchPublic } from "../services/fetch.service";

const FormPayment = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const id = localStorage.getItem("uid");
    const getData = async () => {
      const resp = await fetchPublic("order", null, "GET", id);
      const datos = resp.json();
      setOrder(datos);
      setLoading(false);
    };
    getData();
  }, []);

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

  // if (loading) {
  //   return <div>generando formulario de pago...</div>;
  // }

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
          Hola
        </Typography>
        <Typography variant="h5" align="center">
          📌 A continuación debes de introducir los datos de tu tarjeta para
          procesar el pago! El pago se procesara mediante la platforma de stripe
        </Typography>
        <Box mt={3} />
        <form>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="name"
            autoComplete="off"
            value={""}
            InputProps={{
              readOnly: true,
            }}
          />
          <Box mt={2} />
          <TextField
            fullWidth
            id="amount"
            name="amount"
            label="amount"
            autoComplete="off"
            value={""}
            InputProps={{
              readOnly: true,
            }}
          />
          <Box mt={2} />
          <StripeTextFieldNumber
            error={Boolean(cardNumberError)}
            fullWidth
            required
            labelErrorMessage={cardNumberError}
            onChange={onElementChange("cardNumberComplete", "cardNumberError")}
          />
          <Box mt={2} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StripeTextFieldExpiry
                error={Boolean(expiredError)}
                required
                labelErrorMessage={expiredError}
                onChange={onElementChange("expiredComplete", "expiredError")}
              />
            </Grid>
            <Grid item xs={6}>
              <StripeTextFieldCVC
                error={Boolean(cvcError)}
                required
                labelErrorMessage={cvcError}
                onChange={onElementChange("cvcComplete", "cvcError")}
              />
            </Grid>
          </Grid>
          <Box mt={3} />
          <Button color="success" variant="contained" fullWidth type="submit">
            Pagar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default FormPayment;

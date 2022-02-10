import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { StripeTextFieldCVC, StripeTextFieldExpiry, StripeTextFieldNumber } from "../components/CommonTextField";
import { fetchPublic } from "../services/fetch.service";


const FormPayment = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  //TODO: order de la base de datos
  useEffect(() => {
    setLoading(true);
    const id = localStorage.getItem("uid");
    const getData = async () => {
      const resp = await fetchPublic("order", null, "GET", id);
      const datos = await resp.json();
      setOrder(datos);
      setLoading(false);
    };
    getData();
  }, []);

  // TODO: submit del formulario, Crear metodo de pago
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      const id = localStorage.getItem("uid");
      const crearPago = await fetchPublic(
        "order",
        { token: paymentMethod.id },
        "PUT",
        id
      );
      const resp = await crearPago.json();
      console.log(resp);
      stripe.confirmCardPayment(resp.data.client_secret)
       .then(async()=>{
         const id = localStorage.getItem("uid");
         const resp = await fetchPublic("order/confirm", null, "PUT", id);
         const pago = await resp.json();
         console.log(pago);
         console.log("dinerito, dinerito");
       })
       .catch((e)=>console.log(e));
      

    } else {
      console.log(error);
    }
  };

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

  if (loading) {
    return <div>generando formulario de pago...</div>;
  }

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
          Hola {order.data.name}
        </Typography>
        <Typography variant="h5" align="center">
          📌 A continuación debes de introducir los datos de tu tarjeta para
          procesar el pago! El pago se procesara mediante la plataforma de
          stripe
        </Typography>
        <Box mt={3} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="name"
            autoComplete="off"
            value={order.data.name}
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
            value={order.data.amount}
            InputProps={{
              readOnly: true,
            }}
          />
          <Box mt={2} />
          <StripeTextFieldNumber
            stripeElement={CardNumberElement}
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
                stripeElement={CardExpiryElement}
                error={Boolean(expiredError)}
                required
                labelErrorMessage={expiredError}
                onChange={onElementChange("expiredComplete", "expiredError")}
              />
            </Grid>
            <Grid item xs={6}>
              <StripeTextFieldCVC
                stripeElement={CardCvcElement}
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

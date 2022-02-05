import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { fetchPublic } from "../services/fetch.service";


const validationSchema = yup.object({
  name: yup.string("Enter your name").required("El nombre es requerido"),
  amount: yup.number("Enter your monto").required("El monto es requerido"),
});

const FormGenerar = () => {
  const navigate = useNavigate();
  // TODO: generamos  una nueva orden
  const handleGenerateOrder = async (data) => {
    const newOrder = await fetchPublic("order", data, "POST", null);
    const resp = await newOrder.json();
    localStorage.setItem("uid", resp.data.uid);
    if (newOrder.ok) {
      navigate("/payment");
    } else {
      alert("ocurri un error al generar el link");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleGenerateOrder(values);
      resetForm();
    },
  });
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
          React Stripe - Generar link de pago
        </Typography>
        <Box mt={2} />
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="name"
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Box mt={2} />
          <TextField
            fullWidth
            id="amount"
            name="amount"
            label="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <Box mt={2} />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Generar
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default FormGenerar;

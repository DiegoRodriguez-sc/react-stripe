import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("El nombre es requerido"),
  monto: yup.number("Enter your monto").required("El monto es requerido"),
});

const FormGenerar = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      monto: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ md: { padding: 10}, width:{md:"70%", xs:"100%"}, marginTop:20 }}>
        <Typography variant="h3" align="center">
          React Stripe - Generar link de pago
        </Typography>
        <Box mt={2} />
        <form onSubmit ={formik.handleSubmit}>
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
            id="monto"
            name="monto"
            label="monto"
            type="number"
            value={formik.values.monto}
            onChange={formik.handleChange}
            error={formik.touched.monto && Boolean(formik.errors.monto)}
            helperText={formik.touched.monto && formik.errors.monto}
          />
          <Box mt={2} />
          <Button color = "primary" variant ="contained" fullWidth type="submit">
            Generar
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default FormGenerar;

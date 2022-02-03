import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from '@mui/material/Container';

const validationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .required("El nombre es requerido"),
  monto: yup
    .number("Enter your monto")
    .required("El monto es requerido"),
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
    <Container >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};
export default FormGenerar;

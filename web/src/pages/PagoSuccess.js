import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import success from "../assets/success.svg";

const PagoSuccess = () => {
  let navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          md: { padding: 10 },
          width: { md: "70%", xs: "100%" },
          marginTop: 20,
          textAlign: "center",
        }}
      >
        <Typography variant="h2">Pago realizado</Typography>
        <Box mt={2} />
        <Box
          component="img"
          sx={{ width: "200px" }}
          alt={"logo success"}
          src={success}
        />
        <Box mt={2} />
        <Button variant="contained" color="success" onClick={handleHome}>
          Realizar otro pago
        </Button>
      </Box>
    </Container>
  );
};

export default PagoSuccess;

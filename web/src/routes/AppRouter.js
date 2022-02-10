import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StripeContainer from '../components/StripeContainer';
import FormGenerar from '../pages/FormGenerar';
import PagoSuccess from '../pages/PagoSuccess';


const AppRouter = () => {
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormGenerar /> } />
      <Route path="/payment" element={<StripeContainer /> } />
      <Route path="/payment/success" element={<PagoSuccess /> } />
    </Routes>
  </BrowserRouter>
 );
}

export default AppRouter;

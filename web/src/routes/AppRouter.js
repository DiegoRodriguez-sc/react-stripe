import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import FormGenerar from '../components/FormGenerar';
import StripeContainer from '../components/StripeContainer';

const AppRouter = () => {
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormGenerar /> } />
      <Route path="/payment" element={<StripeContainer /> } />
    </Routes>
  </BrowserRouter>
 );
}

export default AppRouter;

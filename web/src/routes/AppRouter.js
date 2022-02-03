import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import FormGenerar from '../components/FormGenerar';

const AppRouter = () => {
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormGenerar /> } />
    </Routes>
  </BrowserRouter>
 );
}

export default AppRouter;

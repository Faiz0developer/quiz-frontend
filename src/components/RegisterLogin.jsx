import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyOtpPage from '../pages/VerifyOtpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ActivateAccountPage from '../pages/ActivateAccountPage';

const RegisterLogin = () => {
  return (
    <BrowserRouter>
      <div className="font-[karla]">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user-register" element={<RegisterPage />} />
          <Route path="/verify-user" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/activate-account" element={<ActivateAccountPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default RegisterLogin
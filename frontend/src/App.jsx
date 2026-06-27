import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DonateBlood from './pages/DonateBlood';
import NeedBlood from './pages/NeedBlood';
import BloodBanks from './pages/BloodBanks';
import Hospitals from './pages/Hospitals';
import Camps from './pages/Camps';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="donate-blood" element={<DonateBlood />} />
        <Route path="need-blood" element={<NeedBlood />} />
        <Route path="blood-banks" element={<BloodBanks />} />
        <Route path="hospitals" element={<Hospitals />} />
        <Route path="camps" element={<Camps />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TicketForm from './assets/components/vuelos/vista';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/vista" />} />
        <Route path="/vista" element={<TicketForm />} />
      </Routes>
    </Router>
  );
};

export default App;

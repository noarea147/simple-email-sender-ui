import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceInfo from "./InvoiceInfo";
import Invoice from "./Invoice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceInfo />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NavBar from "./components/Navbar.jsx";
import CsvDiagram from "./components/CsvDiagram.jsx";
import Product from "./components/Product.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path="/csv" element={<CsvDiagram />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  </BrowserRouter>
);

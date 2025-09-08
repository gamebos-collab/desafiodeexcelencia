import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EquipesPage from "./pages/EquipesPage";
import Ranking from "./pages/Ranking";
import Conquistas from "./pages/Conquistas";
import Regras from "./pages/Regras";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Equipes" element={<EquipesPage />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/Conquistas" element={<Conquistas />} />
        <Route path="/Regras" element={<Regras />} />
      </Routes>
    </BrowserRouter>
  );
}

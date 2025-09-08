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
        <Route path="/equipes" element={<EquipesPage />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/conquistas" element={<Conquistas />} />
        <Route path="/regras" element={<Regras />} />
      </Routes>
    </BrowserRouter>
  );
}

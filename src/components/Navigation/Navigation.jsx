import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="navigation-container">
      <button className="nav-btn" onClick={() => navigate("/")}>
        Home
      </button>
      <button className="nav-btn" onClick={() => navigate("/equipes")}>
        Ver Equipes
      </button>
      <button className="nav-btn" onClick={() => navigate("/ranking")}>
        Ranking
      </button>
      <button className="nav-btn" onClick={() => navigate("/conquistas")}>
        Conquistas
      </button>
      <button className="nav-btn" onClick={() => navigate("/regras")}>
        Regras
      </button>
    </div>
  );
}

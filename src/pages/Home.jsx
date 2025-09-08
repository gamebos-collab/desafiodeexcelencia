import React from "react";
import HomePage from "../components/homepage/HomePage";
import PainelDeConquistas from "../components/PainelDeConquistas/PainelDeConquistas";
import Informativo from "../components/Informativo/Informativo";
import Footer from "../components/Footer/Footer";

export default function Home() {
  const conquistas = [
    {
      nome: "Primeira Entrega",
      descricao: "Realizou a primeira entrega sem erros.",
      icone: "/assets/conquista1.png",
      desbloqueada: true,
    },
    {
      nome: "Meta Atingida",
      descricao: "Equipe atingiu 100% da meta.",
      icone: "/assets/conquista2.png",
      desbloqueada: false,
    },
    {
      nome: "Zero B.O.",
      descricao: "Semana sem nenhuma ocorrência registrada.",
      icone: "/assets/conquista3.png",
      desbloqueada: true,
    },
  ];

  return (
    <div style={{ position: "relative", padding: "40px", textAlign: "center" }}>
      <HomePage />
      <Informativo />
      <Footer />
    </div>
  );
}

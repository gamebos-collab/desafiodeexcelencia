import React from "react";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

const conquistas = [
  {
    nome: "Campeão",
    descricao: "Campeão primeiro desafio.",
    icone: "/assets/conquistadesbloqueada.png",
    desbloqueada: true,
  },
  {
    nome: "Meta Atingida",
    descricao: "Equipe atingiu 100% da meta.",
    icone: "/assets/conquistabloqueada.png",
    desbloqueada: false,
  },
  {
    nome: "Zero B.O.",
    descricao: "",
    icone: "/assets/conquistabloqueada.png",
    desbloqueada: false,
  },
  {
    nome: "Zero B.O.",
    descricao: "",
    icone: "/assets/conquistabloqueada.png",
    desbloqueada: false,
  },
  {
    nome: "Zero B.O.",
    descricao: "",
    icone: "/assets/conquistabloqueada.png",
    desbloqueada: false,
  },
  {
    nome: "Zero B.O.",
    descricao: "",
    icone: "/assets/conquistabloqueada.png",
    desbloqueada: false,
  },
  {
    nome: "Zero B.O.",
    descricao: "",
    icone: "/assets/conquistabloqueada.png",
    desbloqueada: false,
  },
  {
    nome: "Zero B.O.",
    descricao: "",
    icone: "/assets/conquistabloqueada.png",
    desbloqueada: false,
  },
  //...demais conquistas mantidas
];

const Conquistas = () => {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #160125ff)",
        minHeight: "100vh",
      }}
    >
      <Navigation />
      <h1 style={{ color: "#f9a826", marginBottom: "125px" }}>Conquistas</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "60px",
        }}
      >
        {conquistas.map((conquista, index) => (
          <div
            key={index}
            style={{
              width: "280px",
              backgroundColor: "#2a0845",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              color: "#fff",
              opacity: conquista.desbloqueada ? 1 : 0.4,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <img
              src={conquista.icone}
              alt={conquista.nome}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <h3 style={{ marginBottom: "8px", color: "#f9a826" }}>
              {conquista.nome}
            </h3>
            <p style={{ fontSize: "0.95rem" }}>{conquista.descricao}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Conquistas;

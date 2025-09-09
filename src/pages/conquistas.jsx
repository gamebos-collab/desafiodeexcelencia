import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";

const conquistas = [
  {
    nome: "Zero B.O Acima de 15 Dias",
    descricao: "Campeão primeiro desafio.",
    icone: "/assets/teste.jpg",
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
];

const Conquistas = () => {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const abrirImagem = (src, desbloqueada) => {
    if (desbloqueada) {
      setImagemSelecionada(src);
    }
  };

  const fecharImagem = () => {
    setImagemSelecionada(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        fecharImagem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
              cursor: conquista.desbloqueada ? "pointer" : "default",
            }}
            onClick={() => abrirImagem(conquista.icone, conquista.desbloqueada)}
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
            <h3
              style={{
                marginBottom: "8px",
                fontSize: "1.0rem",
                color: "#f9a826",
              }}
            >
              {conquista.nome}
            </h3>
            <p style={{ fontSize: "0.75rem" }}>{conquista.descricao}</p>
          </div>
        ))}
      </div>

      {imagemSelecionada && (
        <div
          onClick={fecharImagem}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              backgroundColor: "#2a0845",
              padding: "10px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              maxWidth: "80vw",
              maxHeight: "90vh",
            }}
          >
            <img
              src={imagemSelecionada}
              alt="Conquista ampliada"
              style={{
                width: "90%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
            <button
              onClick={fecharImagem}
              style={{
                marginTop: "1px",
                padding: "8px 8px",
                backgroundColor: "#8e2de2",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conquistas;

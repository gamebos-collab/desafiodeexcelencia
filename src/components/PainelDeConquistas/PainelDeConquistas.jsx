export default function PainelDeConquistas({ conquistas }) {
  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h2
        style={{ fontSize: "1.5rem", color: "#ff4081", marginBottom: "20px" }}
      >
        Conquistas
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {conquistas.map((conquista, index) => (
          <div
            key={index}
            style={{
              width: "180px",
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: conquista.desbloqueada ? "#2a0845" : "#555",
              opacity: conquista.desbloqueada ? 1 : 0.5,
              color: "#fff",
              textAlign: "center",
            }}
          >
            <img
              src={conquista.icone}
              alt={conquista.nome}
              style={{ width: "60px", height: "60px", marginBottom: "12px" }}
            />
            <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>
              {conquista.nome}
            </h3>
            <p style={{ fontSize: "0.85rem" }}>{conquista.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

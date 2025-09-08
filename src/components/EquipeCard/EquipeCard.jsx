export default function EquipeCard({
  nome,
  pontuacao,
  membrosLinha1,
  membrosLinha2,
  onMembroClick,
}) {
  return (
    <div
      style={{
        backgroundColor: "#2a0845",
        borderRadius: "12px",
        boxShadow: "0 2px 18px rgba(184, 14, 241, 0.7)",
        padding: "16px",
        width: "260px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>{nome}</h3>
      <p style={{ fontSize: "1.1rem", color: "#f9a826" }}>{pontuacao} pontos</p>

      {/* Primeira linha de membros */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "28px",
          gap: "25px",
          marginTop: "8px",
        }}
      >
        {membrosLinha1.map((membro, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={membro.avatar}
              alt={membro.nome}
              className="zoom-img"
              style={{
                width: "40px",
                height: "35px",
                borderRadius: "10%",
                cursor: "pointer",
              }}
              onClick={() => onMembroClick && onMembroClick(membro)}
            />
            <p style={{ fontSize: "0.9rem", marginTop: "-8px" }}>
              {membro.nome}
            </p>
          </div>
        ))}
      </div>

      {/* Segunda linha de membros */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "25px",
          marginTop: "12px",
        }}
      >
        {membrosLinha2.map((membro, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={membro.avatar}
              alt={membro.nome}
              className="zoom-img"
              style={{
                width: "40px",
                height: "35px",
                borderRadius: "10%",
                cursor: "pointer",
              }}
              onClick={() => onMembroClick && onMembroClick(membro)}
            />
            <p style={{ fontSize: "0.9rem", marginTop: "-8px" }}>
              {membro.nome}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

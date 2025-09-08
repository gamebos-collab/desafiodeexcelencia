export default function RankingBoard({ equipes = [] }) {
  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <h2
        style={{ fontSize: "1.8rem", color: "#00d4ff", marginBottom: "20px" }}
      >
        Ranking
      </h2>
      <ul style={{ listStyle: "none", padding: 0, fontSize: "1.1rem" }}>
        {equipes.map((equipe, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            {index + 1}. {equipe.nome}:{" "}
            <strong>{equipe.pontuacao} pontos</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

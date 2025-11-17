import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import "./HomePage.css";

// ======= INÍCIO DO POPUP MISSÃO (REMOVA ENTRE ESTES COMENTÁRIOS PARA DESABILITAR O POPUP) =======
function MissionPopup({
  show,
  onClose,
  title = "Missão do Dia",
  subtitle = "Você pode editar esta missão até Segunda-feira 0:00",
  period = "Seg 4:00 - Sex 4:00",
  missions = [],
}) {
  if (!show) return null;

  return (
    <div className="mission-popup-overlay">
      <motion.div
        className="mission-popup"
        initial={{ opacity: 0, y: -80, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65 }}
      >
        <div className="mission-popup-header">
          <div className="mission-popup-flag" />
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <span className="mission-period">{period}</span>
          </div>
          <button className="mission-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mission-list">
          {missions.map((mission, idx) => (
            <div key={idx} className="mission-card">
              <div className="mission-card-title">Missão {mission.level}</div>
              <div className="mission-info-row">
                <span className="mission-target">
                  {mission.target.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
                <span className="mission-reward">{mission.reward}</span>
              </div>
              {mission.benefit && (
                <div className="mission-benefit">
                  <span>+{mission.benefit}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
// ======= FIM DO POPUP MISSÃO (REMOVA ENTRE ESTES COMENTÁRIOS PARA DESABILITAR O POPUP) =======

export default function HomePage() {
  const navigate = useNavigate();
  const [dadosTabela, setDadosTabela] = useState([]);
  const [showPopup, setShowPopup] = useState(true); // ativa e desativa popup

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await fetch(`/gamekpi.xlsx?v=${Date.now()}`);
        const buffer = await res.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets["Planilha2"];
        const json = XLSX.utils.sheet_to_json(sheet, {
          range: "F27:K45",
          header: 1,
          blankrows: false,
          defval: 0,
        });

        setDadosTabela(json);
      } catch (err) {
        console.error("Erro ao carregar planilha:", err);
      }
    };

    carregarDados();
  }, []);

  return (
    <>
      <div
        className="homepage-container"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <motion.div
            className="banner"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="game-title">🎮 Desafio de Excelência</h1>
            <p className="subtitle">
              Competição entre equipes rumo à excelência!
            </p>
          </motion.div>

          {/* ======= INÍCIO DO POPUP MISSÃO ======= */}
          <MissionPopup
            show={showPopup}
            onClose={() => setShowPopup(false)}
            title="Missão do Dia"
            subtitle="Ganhe pontos extra no seu Desafio de Excelência!"
            period="Ter - 18/11 08:00 à Ter - 18/11 12:00"
            missions={[
              {
                level: 1,
                target: "20 B.Os\nAcima de 11 dias",
                reward: "🏆 50 pontos",
                benefit: "CPN SAO POA VIX",
              },
              {
                level: 2,
                target: "10 B.Os\nAcima de 11 dias",
                reward: "🏆 50 pontos",
                benefit: "CWB GRU BHZ",
              },
              {
                level: 3,
                target: "5 B.Os\nAcima de 11 dias",
                reward: "🏆 50 pontos",
                benefit: "CXS BLU PPY BAU",
              },
            ]}
          />
          {/* ======= FIM DO POPUP MISSÃO ======= */}

          <motion.div
            className="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button className="btn" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="btn" onClick={() => navigate("/equipes")}>
              Ver Equipes
            </button>
            <button className="btn" onClick={() => navigate("/ranking")}>
              Ranking
            </button>
            <button className="btn" onClick={() => navigate("/conquistas")}>
              Conquistas
            </button>
            <button className="btn" onClick={() => navigate("/regras")}>
              Regras
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "#ccc",
              fontSize: "12px",
            }}
          >
            <p style={{ color: "#ffc400ff" }}>
              🕒 Última atualização do sistema: 15/11/2025 14:06h
            </p>
          </motion.div>

          <div className="tabela-overlay">
            {dadosTabela.length > 1 ? (
              <div
                style={{
                  margin: "40px auto",
                  padding: "20px",
                  width: "80%",
                  maxWidth: "1200px",
                  maxHeight: "120vh",
                }}
              >
                <table
                  style={{
                    borderCollapse: "collapse",
                    backgroundColor: "rgba(0, 0, 0, 0.89)",
                    color: "#fff",
                    width: "100%",
                    fontSize: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <thead>
                    <tr>
                      {Array.isArray(dadosTabela[0]) &&
                        dadosTabela[0].map((header, index) => (
                          <th
                            key={index}
                            style={{
                              padding: "12px",
                              borderBottom: "2px solid #f9a826",
                              fontWeight: "bold",
                              textAlign: "center",
                              backgroundColor: "rgba(0, 0, 0, 0.89)",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dadosTabela.slice(1).map((row, rowIndex) => {
                      const corDeFundo =
                        rowIndex % 2 === 0 ? "#1a1a1ac2" : "#69696938";

                      return (
                        <tr
                          key={rowIndex}
                          className="table-row-hover"
                          style={{ backgroundColor: corDeFundo }}
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              style={{
                                padding: "8.5px",
                                borderBottom: "1px solid #707070ff",
                                textAlign: "center",
                              }}
                            >
                              {cell !== undefined && cell !== null ? cell : 0}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <img
                    src="/assets/bbmlogistica.png"
                    alt="Banner de atualização"
                    style={{
                      maxWidth: "47%",
                      height: "auto",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    }}
                  />
                </div>
              </div>
            ) : (
              <p style={{ color: "#fff", marginTop: "40px" }}>
                Carregando dados da planilha...
              </p>
            )}
          </div>

          <div className="animated-background" />
        </div>
        <br />
      </div>
    </>
  );
}

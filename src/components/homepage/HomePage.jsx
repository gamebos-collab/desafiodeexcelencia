import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [dadosTabela, setDadosTabela] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await fetch(`/gamekpi.xlsx?v=${Date.now()}`);
        const buffer = await res.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets["Planilha2"];
        const json = XLSX.utils.sheet_to_json(sheet, {
          range: "F20:K38",
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
        {/* Conteúdo da página */}
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
              🕒 Última atualização do sistema: 09/10/2025 18:02h
            </p>
          </motion.div>
          {/* POPUP centralizado e reduzido horizontalmente */}
          {showPopup && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: -60 }}
              animate={{ scale: 1.05, opacity: 1, y: 0 }}
              transition={{ duration: 0.45, type: "spring" }}
              style={{
                position: "fixed",
                top: "15%", // Centraliza verticalmente
                left: "30%", // Centraliza horizontalmente
                transform: "translate(-50%, -50%)", // Centralização absoluta
                zIndex: 999999, // Garante que está na frente de tudo
                background: "linear-gradient(90deg, #ff3d00 0%, #ffc400 100%)",
                color: "#1a1a1a",
                fontWeight: "bold",
                fontSize: "1.3rem", // Ajuste o tamanho do texto do popup aqui
                padding: "60px 100px", // Ajuste o padding para aumentar/diminuir o popup
                borderRadius: "16px",
                boxShadow: "0 0 32px 8px #ff3d0055, 0 2px 6px #ffc40077",
                border: "3px solid #fff",
                textAlign: "center",
                maxWidth: "600px", // Reduzido horizontalmente, ajuste conforme quiser
                width: "90vw", // Responsivo, mas limitado pelo maxWidth
                letterSpacing: "1px",
                animation: "shake 1.2s infinite",
              }}
            >
              {/* ATENÇÃO! Título destacado */}⚠{" "}
              <span style={{ color: "#fff", textShadow: "0 0 8px #ff3d00" }}>
                Atenção!
                <br />
                PENALIZAÇÃO APLICADA !
              </span>
              <br />
              <br />
              Equipes Penalizadas
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src="/assets/equipesenior/cwb.jpg"
                  alt="Ícone"
                  width="50"
                  style={{
                    objectFit: "cover",
                  }}
                />

                <img
                  src="/assets/equipesoft/fln.jpg"
                  className="blinking-image"
                  alt="Ícone"
                  width="45"
                  style={{
                    objectFit: "cover",
                  }}
                />

                <img
                  src=""
                  alt="Próxima imagem"
                  width="34"
                  style={{
                    objectFit: "cover",
                    visibility: "hidden",
                  }}
                />
              </div>
              Consulte o INFORMATIVO para entender o motivo.
              <button
                style={{
                  display: "block",
                  margin: "18px auto 0 auto",
                  background: "#fff",
                  color: "#d32f2f",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  padding: "9px 22px",
                  cursor: "pointer",
                  boxShadow: "0 1px 8px #0002",
                  outline: "none",
                  transition: "background 0.2s",
                }}
                onClick={() => setShowPopup(false)}
              >
                OK, entendi
              </button>
            </motion.div>
          )}
          {/* FIM POPUP */}

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

                {/* ✅ Imagem abaixo da tabela */}
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
      {/* DICA: Para animação shake no popup, adicione no seu CSS: */}
      {/* 
      @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%) }
        10%, 30%, 50%, 70%, 90% { transform: translate(-50%, -54%) }
        20%, 40%, 60%, 80% { transform: translate(-50%, -46%);}
      }
      */}
    </>
  );
}

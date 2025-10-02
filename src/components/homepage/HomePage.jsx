import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [dadosTabela, setDadosTabela] = useState([]);

  const ultimaAtualizacao =
    import.meta.env.VITE_DEPLOY_TIMESTAMP || "Data não disponível";

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

        console.log("Dados extraídos:", json);
        setDadosTabela(json);
      } catch (err) {
        console.error("Erro ao carregar planilha:", err);
      }
    };

    carregarDados();
  }, []);

  return (
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
            🕒 Última atualização do sistema: 02/10/2025 08:42h
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

              {/* ✅ Imagem abaixo da tabela */}
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <img
                  src="/assets/bbmlogistica.png" // substitua pelo caminho correto da imagem
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
  );
}

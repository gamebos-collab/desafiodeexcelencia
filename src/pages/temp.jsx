import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

const Ranking = () => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    fetch(`/gamekpi.xlsx?v=${Date.now()}`)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets["Planilha2"];
        const json = XLSX.utils.sheet_to_json(sheet, {
          range: "A2:D4",
          header: 1,
        });
        setRankingData(json);
      })
      .catch((err) => console.error("Erro ao carregar planilha:", err));
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

      <h1 style={{ color: "#f9a826", marginBottom: "32px" }}>
        Ranking dos Maiores Pontuadores
      </h1>

      {rankingData.length > 0 ? (
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "80%",
            color: "#fff",
          }}
        >
          <thead>
            <tr>
              {rankingData[0].map((header, index) => (
                <th
                  key={index}
                  style={{
                    borderBottom: "2px solid #f9a826",
                    padding: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankingData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "10px",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: "#fff" }}>Carregando dados do ranking...</p>
      )}

      <div style={{ marginTop: "6rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Ranking;
// forçar modificação

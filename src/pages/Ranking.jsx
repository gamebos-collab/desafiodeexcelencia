import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Navigation from "../components/Navigation/Navigation";
import "./Ranking.css";

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

  const getRowClass = (index) => {
    if (index === 0) return "ranking-row ranking-first";
    if (index === 1) return "ranking-row ranking-second";
    if (index === 2) return "ranking-row ranking-third";
    return "ranking-row";
  };

  const getGifForPosition = (index) => {
    if (index === 0) return "https://media.tenor.com/1st-place.gif";
    if (index === 1) return "https://media.tenor.com/2nd-place.gif";
    if (index === 2) return "https://media.tenor.com/3rd-place.gif";
    return null;
  };

  return (
    <div className="ranking-container">
      <Navigation />

      <h1 className="ranking-title">Ranking dos Maiores Pontuadores</h1>
      <p className="subtitle">Ranking geral dos maiores pontuadores</p>

      {rankingData.length > 0 ? (
        <table className="ranking-table">
          <tbody>
            {rankingData.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {getGifForPosition(rowIndex) && (
                  <tr>
                    <td colSpan={row.length} className="ranking-gif-cell">
                      <img
                        src={getGifForPosition(rowIndex)}
                        alt={`Posição ${rowIndex + 1}`}
                        className="ranking-gif"
                      />
                    </td>
                  </tr>
                )}
                <tr className={getRowClass(rowIndex)}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="ranking-cell">
                      {cell}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="ranking-loading">Carregando dados do ranking...</p>
      )}

      <div style={{ marginTop: "6rem" }}></div>
    </div>
  );
};

export default Ranking;

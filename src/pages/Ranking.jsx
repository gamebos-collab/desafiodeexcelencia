import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Navigation from "../components/Navigation/Navigation";
import "./Ranking.css";

const Ranking = () => {
  const [rankingGeral, setRankingGeral] = useState([]);
  const [rankingSoft, setRankingSoft] = useState([]);

  useEffect(() => {
    fetch(`/gamekpi.xlsx?v=${Date.now()}`)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets["Planilha2"];

        // Ranking geral - filtra depois
        const geralRaw = XLSX.utils.sheet_to_json(sheet, {
          range: "A2:D77",
          header: 1,
        });
        const softRaw = XLSX.utils.sheet_to_json(sheet, {
          range: "A81:D87",
          header: 1,
        });

        // FILTRO: Retira OPER e PARCEIRO
        const filtroEquipe = (row) => {
          const equipe = (row[0] || "").toUpperCase();
          return !equipe.startsWith("OPER") && !equipe.startsWith("PARCEIRO");
        };

        setRankingGeral(geralRaw.filter(filtroEquipe));
        setRankingSoft(softRaw.filter(filtroEquipe));
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

  const getFirstName = (fullName = "") => {
    if (!fullName) return "";
    const parts = String(fullName).split(" ");
    return parts[0];
  };

  // Garante LINHAS COLADAS: não adiciona <tr> extra para o GIF (coloca dentro do <td>)
  const renderRankingTable = (data) => (
    <table className="ranking-principal-table">
      <tbody>
        {data.slice(0, 3).map((row, rowIndex) => (
          <tr className={getRowClass(rowIndex)} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="ranking-cell">
                {cellIndex === 0 && getGifForPosition(rowIndex) && (
                  <img
                    src={getGifForPosition(rowIndex)}
                    alt={`Posição ${rowIndex + 1}`}
                    className="ranking-gif"
                    style={{ verticalAlign: "middle", marginRight: 6 }}
                  />
                )}
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderOthersDropdown = (data) => {
    const outros = data.slice(3);
    const scroll = outros.length > 7;
    return (
      <details className="others-dropdown">
        <summary className="others-summary minimal-btn" tabIndex={0}>
          <span style={{ marginRight: 4 }}>⬎</span> Ver Todos Participantes
        </summary>
        <ul className={`others-list${scroll ? " others-scroll" : ""}`}>
          {outros.map((row, idx) => (
            <li key={idx} className="others-list-item">
              <span className="others-pos">{idx + 4}º</span>
              <span className="others-equipe">{row[0]}</span>
              <span className="others-nome">{getFirstName(row[1])}</span>
              <span className="others-pontos">{row[3]} pts</span>
            </li>
          ))}
        </ul>
      </details>
    );
  };

  const renderRankingTableSoft = (data) => (
    <table className="ranking-table">
      <tbody>
        {data.slice(0, 3).map((row, rowIndex) => (
          <tr className={getRowClass(rowIndex)} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="ranking-cell">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderOthersDropdownSoft = (data) => {
    const outros = data.slice(3);
    const scroll = outros.length > 7;
    return (
      <details className="others-dropdown">
        <summary className="others-summary minimal-btn" tabIndex={0}>
          <span style={{ marginRight: 4 }}>⬎</span> Ver todos Participantes
        </summary>
        <ul
          className={`others-list soft-list${scroll ? " others-scroll" : ""}`}
        >
          {" "}
          {outros.map((row, idx) => (
            <li key={idx} className="others-list-item">
              <span className="others-pos">{idx + 4}º</span>
              <span className="others-equipe">{row[0]}</span>
              <span className="others-nome">{row[1]}</span>{" "}
              {/* <-- AJUSTE AQUI */}
              <span className="others-pontos">{row[3]} pts</span>
            </li>
          ))}
        </ul>
      </details>
    );
  };

  return (
    <div className="ranking-container">
      <Navigation />

      <h1 className="ranking-title">Ranking dos Maiores Pontuadores</h1>
      <p className="subtitle">Ranking dos maiores pontuadores Sênior e Pleno</p>
      <div className="ranking-flex">
        <div className="main-ranking">
          {rankingGeral.length > 0 ? (
            renderRankingTable(rankingGeral)
          ) : (
            <p className="ranking-loading">Carregando ranking geral...</p>
          )}
        </div>
        <div className="aside-others">
          {rankingGeral.length > 3 && renderOthersDropdown(rankingGeral)}
        </div>
      </div>

      <h2 className="ranking-title" style={{ marginTop: "4rem" }}>
        Ranking Soft
      </h2>
      <p className="subtitle">
        Ranking dos maiores pontuadores exclusiva da categoria Soft
      </p>
      <div className="ranking-flex">
        <div className="main-ranking">
          {rankingSoft.length > 0 ? (
            renderRankingTableSoft(rankingSoft)
          ) : (
            <p className="ranking-loading">Carregando ranking Soft...</p>
          )}
        </div>
        <div className="aside-others">
          {rankingSoft.length > 3 && renderOthersDropdownSoft(rankingSoft)}
        </div>
      </div>
      <div style={{ marginTop: "5rem" }}></div>
    </div>
  );
};

export default Ranking;

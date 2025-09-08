import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import EquipeCard from "../components/EquipeCard/EquipeCard";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

export default function EquipesPage() {
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [equipeSelecionada, setEquipeSelecionada] = useState(null);
  const [descricaoMapeada, setDescricaoMapeada] = useState({});
  const [pontuacaoEquipe, setPontuacaoEquipe] = useState({});

  const [pontuacoesPorCentralizadora, setPontuacoesPorCentralizadora] =
    useState({});

  useEffect(() => {
    fetch(`/gamekpi.xlsx?v=${Date.now()}`)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets["Planilha2"];
        const json = XLSX.utils.sheet_to_json(sheet, { range: "A1:D100" });

        // ✅ Corrigido para garantir que valores 0 sejam preservados
        const getValorSeguro = (celula) =>
          celula?.v !== undefined && celula?.v !== null ? celula.v : 0;

        // Extrai pontuações específicas por centralizadora
        const pontuacoes = {
          CPN: sheet["G2"]?.v !== undefined ? sheet["G2"].v : 0,
          POA: sheet["G3"]?.v !== undefined ? sheet["G3"].v : 0,
          SAO: sheet["G4"]?.v !== undefined ? sheet["G4"].v : 0,
          CWB: sheet["G5"]?.v !== undefined ? sheet["G5"].v : 0,
          BLU: sheet["G6"]?.v !== undefined ? sheet["G6"].v : 0,
          VIX: sheet["G7"]?.v !== undefined ? sheet["G7"].v : 0,
          GRU: sheet["K2"]?.v !== undefined ? sheet["K2"].v : 0,
          CXS: sheet["K3"]?.v !== undefined ? sheet["K3"].v : 0,
          BHZ: sheet["K4"]?.v !== undefined ? sheet["K4"].v : 0,
          PPY: sheet["K5"]?.v !== undefined ? sheet["K5"].v : 0,
          LDA: sheet["K6"]?.v !== undefined ? sheet["K6"].v : 0,
          CAS: sheet["K7"]?.v !== undefined ? sheet["K7"].v : 0,
        };
        setPontuacoesPorCentralizadora(pontuacoes);

        // ✅ Corrigido para preservar valores 0 nas pontuações de equipe
        const pontuacoesEquipe = {
          Sênior: getValorSeguro(sheet["H8"]),
          Pleno: getValorSeguro(sheet["L8"]),
          Soft: getValorSeguro(sheet["P8"]),
        };
        setPontuacaoEquipe(pontuacoesEquipe);

        const mapa = {};
        json.forEach((linha) => {
          const executor = linha["CENTRALIZADORA"]?.trim().toUpperCase();
          if (executor) {
            if (!mapa[executor]) mapa[executor] = [];
            mapa[executor].push({
              membro: executor,
              nome: linha["NOME"] || "",
              funcao: linha["FUNÇÃO"] || "",
              pontuacao: linha["PONTUAÇÃO"] || "",
            });
          }
        });

        setDescricaoMapeada(mapa);
      })
      .catch((err) => console.error("Erro ao carregar Excel:", err));
  }, []);

  const equipes = [
    {
      nome: "Sênior",
      pontuacao: pontuacaoEquipe?.["Sênior"] ?? 0,
      imagem: "/assets/equipeA.jpg",
      membrosLinha1: [
        { nome: "CPN", avatar: "/assets/equipesenior/cpn.png" },
        { nome: "POA", avatar: "/assets/equipesenior/poa.jpg" },
        { nome: "SAO", avatar: "/assets/equipesenior/sao.jpg" },
      ],
      membrosLinha2: [
        { nome: "CWB", avatar: "/assets/equipesenior/cwb.jpg" },
        { nome: "BLU", avatar: "/assets/equipesenior/blu.jpg" },
        { nome: "VIX", avatar: "/assets/equipesenior/vix.jpeg" },
      ],
    },
    {
      nome: "Pleno",
      pontuacao: pontuacaoEquipe?.["Pleno"] ?? 0,
      imagem: "/assets/equipeB.jpg",

      membrosLinha1: [
        { nome: "GRU", avatar: "/assets/equipepleno/gru.png" },
        { nome: "CXS", avatar: "/assets/equipepleno/cxs.jpg" },
        { nome: "BHZ", avatar: "/assets/equipepleno/bhz.png" },
      ],
      membrosLinha2: [
        { nome: "PPY", avatar: "/assets/equipepleno/ppy.png" },
        { nome: "LDA", avatar: "/assets/equipepleno/lda.jpg" },
        { nome: "CAS", avatar: "/assets/equipepleno/cas.png" },
      ],
    },
    {
      nome: "Soft",
      pontuacao: pontuacaoEquipe?.["Soft"] ?? 0,
      imagem: "/assets/equipeC.jpg",

      membrosLinha1: [
        { nome: "FLN", avatar: "/assets/equipesoft/fln.jpg" },
        { nome: "BAU", avatar: "/assets/equipesoft/bau.png" },
        { nome: "SOR", avatar: "/assets/equipesoft/sor.png" },
      ],
      membrosLinha2: [
        { nome: "JVL", avatar: "/assets/equipesoft/jvl.jpg" },
        { nome: "SMA", avatar: "/assets/equipesoft/sma.png" },
        { nome: "RIP", avatar: "/assets/equipesoft/rip.jpg" },
      ],
    },
    //... outras equipes
  ];

  const handleMembroClick = (membro, equipe) => {
    const chave = membro.nome.trim().toUpperCase();
    const linhas = descricaoMapeada[chave] || [];
    setMembroSelecionado({ ...membro, linhas });
    setEquipeSelecionada(equipe);
  };

  const closeModal = () => {
    setMembroSelecionado(null);
    setEquipeSelecionada(null);
  };

  const thStyle = {
    borderBottom: "1px solid #ccc",
    padding: "8px",
    textAlign: "center", // ← Modificado para alinhar à esquerda
    fontWeight: "bold",
    color: "#fff",
    whiteSpace: "nowrap", // ← Impede quebra de linha
    overflow: "hidden", // ← Garante que o conteúdo não ultrapasse
    textOverflow: "ellipsis", // ← Adiciona reticências se o texto for longo
  };

  const tdStyle = {
    borderBottom: "2px solid #444",
    padding: "12px",
    textAlign: "center", // ← Modificado para alinhar à esquerda
    color: "#fff",
    maxWidth: "2200px", // ← Limita a largura máxima da célula
    whiteSpace: "nowrap", // ← Impede quebra de linha
    overflow: "hidden", // ← Garante que o conteúdo não ultrapasse
    textOverflow: "ellipsis", // ← Adiciona reticências se o texto for longo
  };

  return (
    <div
      style={{
        padding: "2px",
        textAlign: "center",
        background: "linear-gradient(135deg, #160125ff)",
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navigation />
      <h1 style={{ color: "#f9a826", marginBottom: "120px" }}>
        Ranking das Equipes
      </h1>

      <div
        style={{
          display: "flex",
          gap: "94px",
          justifyContent: "center",
          flexWrap: "wrap",
          flexGrow: 1,
        }}
      >
        {equipes.map((equipe, index) => (
          <EquipeCard
            key={index}
            nome={equipe.nome}
            pontuacao={equipe.pontuacao}
            imagem={equipe.imagem}
            membrosLinha1={equipe.membrosLinha1}
            membrosLinha2={equipe.membrosLinha2}
            onMembroClick={(membro) => handleMembroClick(membro, equipe)}
          />
        ))}
      </div>

      {membroSelecionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            fontSize: "13px",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            padding: "20px",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#2a0845",
              boxShadow: "0 2px 14px rgba(184, 14, 241, 0.7)",
              padding: "40px",
              borderRadius: "8px",
              width: "1200px",
              textAlign: "center",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#2a0845",
                paddingBottom: "20px",
                zIndex: 10,
              }}
            >
              <img
                src={membroSelecionado.avatar}
                alt={membroSelecionado.nome}
                style={{ width: "125px", borderRadius: "10%" }}
              />
              <h2 style={{ marginTop: "12px", color: "#fff" }}>
                {membroSelecionado.nome}
              </h2>
              <p style={{ color: "#fff" }}>
                Equipe: <strong>{equipeSelecionada.nome}</strong>
              </p>
              <p style={{ color: "#fff" }}>
                Pontuação:{" "}
                <strong>
                  {pontuacoesPorCentralizadora[
                    membroSelecionado.nome.trim().toUpperCase()
                  ] ?? 0}{" "}
                  pontos
                </strong>
              </p>
            </div>

            <div
              style={{
                marginTop: "24px",
                textAlign: "left",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {membroSelecionado.linhas.length > 0 ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    tableLayout: "relative", // ← Adicionado para respeitar largura das colunas
                  }}
                >
                  <thead>
                    <tr>
                      <th style={thStyle}>CENTRALIZADORA</th>
                      <th style={thStyle}>NOME</th>
                      <th style={thStyle}>FUNÇÃO</th>
                      <th style={thStyle}>PONTUAÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membroSelecionado.linhas.map((linha, index) => (
                      <tr key={index} className="table-row-hover">
                        <td style={tdStyle}>{linha.membro}</td>
                        <td style={tdStyle}>{linha.nome}</td>
                        <td style={tdStyle}>{linha.funcao}</td>
                        <td style={tdStyle}>{linha.pontuacao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "#fff" }}>Descrição não encontrada.</p>
              )}
            </div>

            <button
              onClick={closeModal}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
